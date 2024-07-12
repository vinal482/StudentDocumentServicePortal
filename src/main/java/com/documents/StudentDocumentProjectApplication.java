package com.documents;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import com.documents.model.DocumentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class StudentDocumentProjectApplication extends SpringBootServletInitializer {

	private static final String ALGORITHM = "AES/GCM/NoPadding";
	private static final int KEY_SIZE = 256; // Adjust for desired key size (128, 192, or 256)
	private static final int TAG_LENGTH = 128; // Recommended tag length for GCM

	@Autowired
	EmailSenderService emailSenderService;

//	public String encrypt(String message, String key) {
//		try {
//			Cipher cipher = Cipher.getInstance(ALGORITHM);
//
//			// Generate a random initialization vector (IV) for each encryption
//			SecureRandom random = SecureRandom.getInstanceStrong();
//			byte[] iv = new byte[cipher.getBlockSize()];
//			random.nextBytes(iv);
//
//			GCMParameterSpec spec = new GCMParameterSpec(TAG_LENGTH, iv);
//
//			// Derive a SecretKey from the provided key using a KDF (optional for extra security)
//			// You can use a KDF like PBKDF2 for key derivation
//			byte[] derivedKey = key.getBytes(StandardCharsets.UTF_8); // Replace with KDF implementation
//
//			SecretKeySpec secretKeySpec = new SecretKeySpec(derivedKey, "AES");
//
//			cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, spec);
//			byte[] encryptedMessage = cipher.doFinal(message.getBytes(StandardCharsets.UTF_8));
//
//			// Combine IV and encrypted message for transport/storage
//			byte[] combined = new byte[iv.length + encryptedMessage.length];
//			System.arraycopy(iv, 0, combined, 0, iv.length);
//			System.arraycopy(encryptedMessage, 0, combined, iv.length, encryptedMessage.length);
//
//			// Base64 encode for easier transport/storage
//			return Base64.getEncoder().encodeToString(combined);
//		} catch(Exception e) {
//			return "";
//		}
//	}

	public String encryptFile(String inputParam) {
		try {
			String encryptionKey = "3801652609301013";
			byte[] keyBytes = encryptionKey.getBytes("UTF-8");
			SecretKey key = new SecretKeySpec(keyBytes, "AES");

			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // Prefer GCM mode for integrity
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] ciphertext = cipher.doFinal(inputParam.getBytes("UTF-8"));

			return Base64.getEncoder().encodeToString(ciphertext);  // Use commons-codec for Base64 encoding
		} catch (Exception e) {
			throw new RuntimeException("Encryption failed", e);
		}
	}

	public String decryptFile(String encryptedInput) {
		try {
			String encryptionKey = "3801652609301013";
			byte[] keyBytes = encryptionKey.getBytes("UTF-8");
			SecretKey key = new SecretKeySpec(keyBytes, "AES");

			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // Prefer GCM mode for integrity
			cipher.init(Cipher.DECRYPT_MODE, key);
			byte[] ciphertext = Base64.getDecoder().decode(encryptedInput);
			byte[] decryptedText = cipher.doFinal(ciphertext);

			return new String(decryptedText, "UTF-8");
		} catch (Exception e) {
			throw new RuntimeException("Decryption failed", e);
		}
	}

	@GetMapping("/status")
	public String getStatus()
	{
		return "Application is running....!!";
	}

	@GetMapping("/sendMail")
	public String sendMail() {
		try {
			emailSenderService.sendEmail("karanhpadhiyar12345@gmail.com", "Test", "Hi");
		} catch (Exception e) {
			System.out.println("Email not sent " + e);
			return "Email not sent " + e;
		}
		return "Email sent";
	}

	@PostMapping("/getEncryptedURL")
	public String getEncryptedURL(@RequestBody DocumentDetails doc) {
		if(doc.getDocumentName() == null) {
			return "";
		}
		else {
			return encryptFile(doc.getDocumentName());
		}
	}

	@PostMapping("/getDecryptedURL")
	public String getDecryptedURL(@RequestBody DocumentDetails doc) {
		if(doc.getDocumentName() == null) {
			return "";
		}
		else {
			return decryptFile(doc.getDocumentName());
		}
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS");
			}
		};
	}
	public static void main(String[] args) {
		SpringApplication.run(StudentDocumentProjectApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(StudentDocumentProjectApplication.class);
	}
}
