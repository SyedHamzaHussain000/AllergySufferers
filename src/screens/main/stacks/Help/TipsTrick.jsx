// import {View, Text, useWindowDimensions} from 'react-native';
// import React from 'react';
// import RenderHtml from 'react-native-render-html';
// import {responsiveWidth} from '../../../../utils/Responsive_Dimensions';
// import AppImages from '../../../../assets/images/AppImages';
// import AppHeader from '../../../../components/AppHeader';

// const TipsTrick = () => {
//   const {width} = useWindowDimensions();

//   const source = {
//     html: `
//       <h1>Tips & Trick</h1>


// <p><span>Allergy tip #1</span> - Check pollen counts on your app in the morning and try to stay indoors when they’re high.</p>
// <p><span>Allergy tip #2</span> - Know exactly what you’re allergic too & avoid those pollen types by checking your pollen forecast app levels.</p>
// <p><span>Allergy tip #3</span> - Know your Allergy Triggers. Create a calendar of symptoms in your app & check pollen forecast on your app.</p>
// <p><span>Allergy tip #4</span> - After being outdoors, take a shower & change your clothes to wash away any allergens that could be on you..</p>
// <p><span>Allergy tip #5</span> - It the pollen count is high, keep the windows and doors closed to protect your indoor air.</p>
// <p><span>Allergy tip #6</span> - Fine-tune your fitness routine. Morning exercisers hit hardest generally by airborne allergen. Consider indoor workouts.</p>
// <p><span>Allergy tip #7</span> - To avoid ragweed season, consider a vacation, late summer & early fall in a great time to.</p>
      

//     `,
//   };

//   const tagsStyles = {
//     h1: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 12,
//     },
//     h2: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginTop: 20,
//       marginBottom: 10,
//     },
//     h4: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       marginTop: 20,
//     },
//     p: {
//       fontSize: 14,
//       color: '#333',
//       marginBottom: 10,
//     },
//     span: {
//       fontWeight: 'bold',
//       color: '#000',
//     },
//   };

//   return (
//     <View style={{padding: 20}}>
//       <AppHeader goBack={true}/>
//       <RenderHtml
//         contentWidth={responsiveWidth(100)}
//         source={source}
//         tagsStyles={tagsStyles}
//       />
//     </View>
//   );
// };

// export default TipsTrick;


import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveWidth } from '../../../../utils/Responsive_Dimensions';

import { AllergyTips } from '../../../../utils/AllergyTips';
import AppHeader from '../../../../components/AppHeader';




const TipsTrick = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <AppHeader goBack={true} heading="Tips & Tricks" />

      <FlatList
        data={AllergyTips}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ 
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              marginBottom: 5 
            }}>
              Allergy tip #{item.id}
            </Text>
            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#333' }}>
              {item.tip}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TipsTrick;
