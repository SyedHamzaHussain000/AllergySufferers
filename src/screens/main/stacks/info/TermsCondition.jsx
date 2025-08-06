import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import {responsiveWidth} from '../../../../utils/Responsive_Dimensions';
import AppHeader from '../../../../components/AppHeader';

const TermsCondition = () => {
  const {width} = useWindowDimensions();

  const source = {
    html: `
      <h1>Terms & Conditions</h1>
      <h1>Allergy Sufferers User Agreement</h1>
      <span>Terms and Conditions (“Terms”)</span>
      <p>Last updated: August 05 2025</p>

      <p>Please read these Terms and conditions (“Terms”, “Terms and Conditions”) carefully before using the http://Allergy Sufferers.ca website and the Allergy Sufferers mobile application (the “Service”) operated by 1048361 Ontario Ltd. a.k.a. Aerobiology Research (“us”, “we”. or “our”).</p>
      <p>Your access to and use of the Service is conditioned
on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use assumes no responsibility for, the content, privacy policies, or practices of any third party websites or services. You further acknowledge and agree that Aerobiology Research shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.</p>
      
      <h2>Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms and Conditions, please contact us at apps@aerobiology.ca.</p>
    `,
  };

  const tagsStyles = {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    h4: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
    p: {
      fontSize: 14,
      color: '#333',
      marginBottom: 10,
    },
    span: {
      fontWeight: 'bold',
      color: '#000',
    },
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow:1, padding:20}}>
      <AppHeader goBack/>
      <RenderHtml
        contentWidth={responsiveWidth(100)}
        source={source}
        tagsStyles={tagsStyles}
      />
    </ScrollView>
  );
};

export default TermsCondition;
