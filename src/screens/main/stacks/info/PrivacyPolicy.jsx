import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import {responsiveWidth} from '../../../../utils/Responsive_Dimensions';
import AppHeader from '../../../../components/AppHeader';

const PrivacyPolicy = () => {
  const {width} = useWindowDimensions();

  const source = {
    html: `
      <h1>Privacy Policy</h1>
      <p>Last updated: August 05 2025</p>
      <p>This privacy policy has been compiled to better
serve those who are concerned with how their
‘Personally Identifiable Information’ (PII) is being
used online. PII, as described in US and Canadian
privacy law and information security, is information
that can be used on its own or with other information
to identify, contact, or locate a single person, or to
identify an individual in context. Please read our 
privacy policy carefully to get a clear understanding
of how we collect, use, protect or otherwise handle
your Personally Identifiable Information in
accordance with our website.</p>
      
      <h2>What personal information do we collect from the people that visit our blog, website or app?</h2>
      <p>When ordering or registering on our site, as
appropriate, you may be asked to enter your name, 
email address, Credit card information /if information
nor do we disclose anonymous information that
could represent any individual person. </p>

      <p>We engage in this practice because this data is
useful for researchers and pharmaceutical companie
when attempting to analyze health or allergy trends,
or preparing to develop or evaluate medication. This
information can also be useful for just-In-Time Management systems that can help ensure allergy
products do not go out of stock in a region. We also 
intend to use this information either directly or in partnership with third parties to improve our services,
in order to provide reports with indicators that are as
relevant and useful as possible to each individual’s
allergy suffering and allergy treatment.</p>



      <h2>Questions?</h2>
      <p>Please contact us at: 
        <a href="mailto:apps@aerobiology.ca">apps@aerobiology.ca</a>
      </p>
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
    a:{
      fontWeight: 'bold',
      color: 'blue',
    }
  };

  return (
        <ScrollView contentContainerStyle={{flexGrow:1, padding:20, paddingBottom:200}}>
      <AppHeader goBack/>
      <RenderHtml
        contentWidth={responsiveWidth(100)}
        source={source}
        tagsStyles={tagsStyles}
      />
    </ScrollView>
  );
};

export default PrivacyPolicy;
