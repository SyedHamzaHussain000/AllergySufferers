import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import AppHeader from '../../../../components/AppHeader';
import Pdf from 'react-native-pdf';

const ForcastExplaination = () => {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeigh = Dimensions.get('screen').height;

  return (
    <View style={{padding:0 , margin:0}}>
      <View style={{padding: 20, paddingBottom: 0}}>
        <AppHeader goBack={true} heading="Forecast explanation" />
      </View>

      <Pdf
        source={{
          uri: 'https://www.allergysufferers.ca/explainforcast.pdf',
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{height: screenHeigh, width: Dimensions.get('window').width, }}
              // style={{flex:1, width:Dimensions.get('window').width}}
              
        spacing={0}
        scale={1.2}
        fitPolicy={0}
        
        trustAllCerts={false}
      />
    </View>
  );
};

export default ForcastExplaination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: 300,
    height: 500,
  },
});
