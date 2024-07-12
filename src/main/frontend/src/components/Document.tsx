import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from "../Assets/DA_logo-min.png";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        height: "100%",
        width: "100%",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    headerLogoContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    logoImage: {
        height: "85px",
        width: "auto",
    },
    bodyContainer: {
        // marginTop: 20,
        paddingHorizontal: 40,
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 350,
    }

});

// Create Document Component
const MyDocument = ({data}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.headerLogoContainer}>
                <Image src={Logo} style={styles.logoImage} />
            </View>
            <View style={styles.bodyContainer}>
                <Text style={{fontWeight: 900, textDecoration: "underline", fontSize: "20px", marginBottom: 20}}>BONAFIDE CERTIFICATE</Text>4
                <View style={{width: "100%", justifyContent: "flex-start", alignItems: "flex-start", fontSize: "16px", lineHeight: 2}}>
                    <Text>This is to certify that</Text>
                    <Text>Ms./ Mr. &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; <Text style={{textDecoration: "underline"}}>{data.name}</Text> </Text>
                    <Text>Student ID: &emsp; &emsp; &emsp; &emsp;<Text style={{textDecoration: "underline"}}>{data.id}</Text> </Text>
                    <Text style={{lineHeight: 1}}>is a bonafide student of the Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT).</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;