import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../components/Document.tsx';

const App = () => (
    <>
        <PDFViewer>
            <MyDocument data={{name: "VINAL BORICHA", id: "202001062"}}/>
        </PDFViewer>
        <PDFDownloadLink document={<MyDocument data={{name: "VINAL BORICHA", id: "202001062"}} />} fileName="fee_acceptance.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    </>
);

ReactDOM.render(<App />, document.getElementById('root'));
export default App;