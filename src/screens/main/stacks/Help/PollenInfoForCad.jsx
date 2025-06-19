import {View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../../components/AppHeader';
import AppText from '../../../../components/AppTextComps/AppText';
import AppColors from '../../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../../../utils/Responsive_Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HTMLView from 'react-native-htmlview';

const PollenInfoForCad = () => {
  const [isIndex, setIndex] = useState();

  const pollens = [
    {
      id: 1,
      name: 'Alberta',
      html: `
      <p class="p1"><strong>Predominant Pollen for Calgary and Southern Alberta</strong></p>
<p class="p2">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a></span> season starts from early March to early April and ends from late June to mid-July. The counts vary from low to moderate due to the number of species present.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">This group of weeds are similar microscopically and are not differentiated. They include some weeds, which are considered allergenic. Occasional moderate counts are observed. The season can start mid-June and end early October. At these levels they may be of no significance depending on species present and the sensitization of individuals.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#ash-fraxinus">Ash</a></span> pollination season is short and can start from late April to early May and end late May to mid-June. Some very high counts are observed. The pollen season and levels can vary a great deal which is partially due to weather. Considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#birch-betula">Birch</a></span> season can start from late April to early May and end early to mid-June. The counts can reach high levels, depending on the year. Some years only low and moderate counts are observed. The seasonal fluctuations are partially attributable to weather.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers and yews</a></span> produce some moderate counts from mid-April to mid-May. The season starts early to late March and ends late July. Can cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#elm-ulmaceae">Elm</a></span> are important allergens. The season can start between late March to early May and can end late April to late May. The seasons can vary not only in when they occur but the amount fo pollen produced from year to year. This is probably mostly due to the effect of weather. The counts are low to moderate and can create allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae">Grasses</a></span> produce significant counts, from low to high range, from late May to early October with the most significant counts occuring in June and July.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maple</a></span> season varies from year to year slightly due to weather. Significant counts are observed from the end of April to the end of May. The season can start from the second week of April to early May and end late May to mid-June. The amount of pollen from the maples varies from one part of the City to the other. The counts at this site can get high compared to the other site.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#mugwort-artemisia">Mugwort</a></span> season is from late July to early October with low and the occasional moderate counts observed. Can be significant in causing allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica">Nettles</a></span> and parietaria season can start from mid to late June and ends late August. The counts are usually low with the occasional moderate counts. Due to their small size they are considered important allergens.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#oak-quercus">Oaks</a></span> flower for a short period, with low counts and the season generally occurs in the month of May. Two seasons are possible with the second one occuring from mid-May to early June. Oaks can be highly allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Very high counts are observed for <a href="http://pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae"><span class="s1">spruce, fir and pine trees</span></a> from late May to late July. The pollen season can occur between early May to the end of July. The season varies from year to year due to weather.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#plantains-plantago">Plantains</a></span> pollinate from early June to mid-September. The counts are in the low range but may cause allergic reaction in highly sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar, cottonwood and aspen</a></span> season can start from mid-March to mid-April and end mid to late May. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a></span> season is from the mid-August to mid-September with only very sporadic low counts observed.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#sagebrush-artemisia">Sagebrush</a></span> season is from late July to early October with low and the occasional moderate counts observed. Can be significant in causing allergic reactions.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/allergies/types-of-pollen/#willow-salix">Willows</a></span> pollen season can start from mid-April to the second week of May and end late May to mid-June. The season usually lasts at least a month and can be sporadic. There is some variation in the season from year to year and low to moderate counts are observed.</p>
<p class="p4">&nbsp;</p>
<p class="p1"><strong>Predominant Spores for Calgary and Southern Alberta, Alberta</strong></p>
<p class="p6">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Alternaria">Alternaria</a></span> counts are in the low to moderate ranges and some species are known to cause allergic reactions. The season is from mid-April to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The counts are significant from March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Boletus">Boletus</a></span> season is very sporadic with some high counts observed. It may be of significance in causing allergic reactions. The season is from late June to the end of September.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Botrytis">Botrytis</a></span> may be a significant allergen, with low to moderate counts. The season is June to the end of September.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4">Some species of <a href="http://pollenexperts.ca/types-fungal-mold-spores/#Cladosporium"><span class="s1">Cladosporium</span></a> are known to cause allergic reactions. The most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Coprinus">Coprinus</a></span> mushroom produces moderate and high counts from late May to early October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4">The counts for <a href="http://pollenexperts.ca/types-fungal-mold-spores/#Diatrypaceae"><span class="s1">Diatrypaceae</span></a> are sporadic throughout the whole counting season. Very high counts can be observed from late March to mid-October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts for Drechslera are mostly in the low range with some moderate counts in July and August. This is a summer and fall spore, June to September. There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <a href="http://pollenexperts.ca/types-fungal-mold-spores/#Epicoccum"><span class="s1">Epicoccum</span></a> are known to cause allergic reactions. The season is from late May to the end of September with only low counts. May not be a significant allergen at these levels.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a></span>, also known as Powdery mildew, season runs from May to mid-October. The counts are mostly in the low and moderate ranges with some high counts observed. May not be significant in causing allergic reactions.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Ganoderma">Ganoderma</a></span> also known as bracket fungus can produce high counts from mid-June to the end of September. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Helicomyces">Helicomyces</a></span> season is very sporadic from May to the end of September producing low to high counts.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Leptosphaeria">Leptosphaeria</a></span> season starts in May and runs through to the end of September. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from July to early October. They could cause allergic reactions.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts are observed from April to mid-October. Allergenic properties are not well known.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The counts are significant from March to late fall.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://pollenexperts.ca/types-fungal-mold-spores/#Uredinales">Uredinales</a></span> aka rusts do occur in very high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from early June to mid-October. The counts are mostly low to moderate with some in the very high range.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">Allergenic properties of <a href="http://pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales"><span class="s1">Ustilaginales</span></a> also know as smuts are unknown. The season is from June to mid-October with some very high counts from July to the end of September.</p>
<p class="p1"><strong>Predominant Pollen for Edmonton and Northern Alberta</strong></p>
<p class="p6">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a></span> season produces significant counts from the end of March to late June. The season starts from late March to mid-April and ends mid to late June. The counts fluctuate from low to high due to the number of species present and the effect of weather. The alder are considered important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ash-fraxinus">Ash</a></span> pollen season usually lasts approximately two weeks and can begin from late April to the third week of May and end from mid-May to early June. Some moderate and low counts are observed. Considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#birch-betula">Birch</a></span> season can start from late April to mid-May and end late May to mid-June with some very high counts observed. The season for birch varies from year to year due to the effect of weather. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers, and yews</a></span> produce some counts from April to early July. The counts are usually low so they are probably of no significance in causing allergic reactions.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#elm-ulmaceae">Elm</a></span> are important allergens. Very little pollen is collected where the sampler is located. The season can start from the second week of April to mid-May. The season can end late April to late May. The season can last from one to two weeks depending on the year.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae">Grasses</a></span> produce significant counts, mostly in the moderate range with a few high counts. The season can start mid to late june and end early October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hazel-corylus">Hazelnut</a></span> season can occur from early April to mid-May, depending on winter and spring conditions. The counts are in the low range and may not cause allergic reactions at these levels.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maple</a></span> season varies from year to year largely due to the effect of weather. The season can occur from the end of April to the end of May with some moderate counts.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#mugwort-artemisia">Mugwort</a></span> season is from mid-July to late September with some moderate counts observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica">Nettles</a></span> and parietaria occur in significant numbers that may cause allergic reactions. The season can start from mid-June to early July and end late August and the counts are generally in the low to moderate range. They are considered important allergens due to their samll size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#oak-quercus">Oaks</a></span> flower for a short period during the month of May. Only low counts are observed. May be of significance to those who are highly sensitized.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Very high counts are observed for <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae"><span class="s1">spruce, fir and pine</span></a> trees. The pollen season can start from early May to late May and end mid-July to early August. The start and end of the season can vary by four weeks from year to year due to the effect of weather. This group is very important to those who are sensitized.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar, cottonwood and aspen</a></span> season can start from late March to late April and end mid-May to early June. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a></span> season is from mid-August to early September with only sporadic low counts observed.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#sagebrush-artemisia">Sagebrush</a></span> season is from mid-July to late September with some moderate counts observed.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#willow-salix">Willow</a></span> season can start from mid-April to early May and end third week of May to mid-June. The season can last almost two months. There is some variation in the season from year to year due to weather and mostly moderate and low counts are observed with the rare high count.</p>
<p class="p1"><strong>Predominant Spores for Edmonton and Northern Alberta</strong></p>
<p class="p6">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Alternaria">Alternaria</a></span> counts do get high and some species are known to cause allergic reactions. The season is from May to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Boletus">Boletus</a></span> season is sporadic with some very high counts observed. It may be of significance in causing allergic reactions. The season is mid-June to well into October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Botrytis">Botrytis</a></span> may be a significant allergen, with mostly moderate counts. The season is June to the end of September.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is from mid-May to the end of September. The counts are sporadic and in the low to moderate range.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium">Cladosporium</a></span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Coprinus">Coprinus</a></span> mushroom produces moderate and high counts from May to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4">The counts are sporadic for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Diatrypaceae"><span class="s1">Diatrypaceae</span></a> throughout the whole counting season. Very high counts can be observed from late March to mid-October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are mostly in the low to moderate range. The significant counts occur from July to September. There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Epicoccum"><span class="s1">Epicoccum</span></a> are known to cause allergic reactions. The season, with significant counts, is from mid-July to the end of September with moderate counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a></span>, also known as Powdery mildew, season runs from the end of April to the end of September. Mostly moderate, with some high counts observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Fusarium">Fusarium</a></span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to mid-October with some high counts at this location. They are known to cause allergic reactions.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma">Ganoderma</a></span> or bracket fungus can produce very high counts from June to well into October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Helicomyces">Helicomyces</a></span> season is from mid-May to the end of September producing moderate and high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Leptosphaeria">Leptosphaeria</a></span> season is from May to mid-October. The counts vary from day to day, which is probably due to the effect of weather and the number of species present. Very high counts are observed from July to mid-October. They are known to cause allergic reactions.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts are observed from mid-April to mid-October. Mostly low to moderate counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">The majority of the season occurs in August with mostly moderate counts.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Uredinales">Uredinales</a></span> also know as rusts do occur in high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from June to mid-October. The counts are mostly moderate with some in the high range.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">Allergenic properties of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales"><span class="s1">ustilaginales</span></a> a.k.a smuts are unknown. The season is from May to mid-October with some very high counts from July to mid-October.</p>
    `,
      top: true,
    },
    {
      id: 2,
      name: 'British Columbia',
      html: `<p class="p1"><span class="s1"><strong>Pollen and Spores in British Columbia</strong></span></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p4"><strong>Predominant Pollen for Vancouver Island, British Columbia</strong></p>
<p class="p5"><strong>Alder (Alnus sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a></span> season can start mid-March to early April and end early to late June. Moderate and high counts can occur. Alders are considered important allergens.</p>
<p class="p5"><strong>Beech (Fagus sp.)</strong></p>
<p class="p6">Sylvatica and grandifolia are two species present at this location. The <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#beech-fagus"><span class="s2">beech</span></a> some years produce moderate counts but the season varies a great deal from year to year due to the effect of weather. This is partly due to cyclical patterns and weather. The season can last from mid-April to mid-May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p5"><strong>Birch (Betula sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#birch-betula">Birch</a></span> season can start from mid-April to early May and end early to late June. Very high counts are observed and they are considered important allergens.</p>
<p class="p5"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers and yews</a></span> season starts from early to late March and ends late May to early June. Very high counts can be observed but most species in Canada are not considered allergenic.</p>
<p class="p5"><strong>Dock weed &amp; Sheep sorrel weed (Rumex sp.)</strong></p>
<p class="p6">The <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#dockweed-rumex"><span class="s2">dock and sorrel</span></a> season can start from early to mid-May and ends early August. The pollen is considered mildly allergenic.</p>
<p class="p5"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p6">Elm season can start between late January and early March and last from early to mid-April. Mostly low to moderate, with the occasional high, counts are observed. The elms are considered important allergens.</p>
<p class="p5"><strong>Grasses (Gramineae family)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae">Grasses</a></span> produce moderate counts, from June to the end of July, a few high counts can be observed for certain years. The season can start mid-May and end early October.</p>
<p class="p5"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p6">The <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hazel-corylus"><span class="s2">hazelnuts</span></a> produce some moderate counts during the months of January and February. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p5"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hemlocks-corylus">Hemlocks</a></span> produce low to moderate counts at this location and the season can occur between mid-March to late June. The season is very sporadic from year to year and lasts almost two months. May cause allergic reactions in individuals who are highly sensitized when shed in high numbers.</p>
<p class="p5"><strong>Larch and tamaracks (Larix sp.)</strong></p>
<p class="p6">Larch and tamaracks produce low to moderate counts. There are two seasons that can occur between late March to late May. This is probably due to the number of species present. The season lengths and amount of pollen produced can fluctuate a great deal from year to year.</p>
<p class="p5"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maples and Box Elder</a></span> can have a short early season from mid March to early April. The main season can start from early to mid-April and end mid to late May. Some very high counts are observed and some species are known to cause allergic reactions.</p>
<p class="p5"><strong>Nettles and parietaria (Urticaceae sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica">Nettles</a></span> and parietaria produce a few moderate counts from mid-May to late June. The season is sporadic. They are considered important in causing allergic reactions due to the small size of the pollen</p>
<p class="p5"><strong>Oak (Quercus sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#oak-quercus">Oak</a></span> season can occur from mid-April and end late May with a few moderate and very occasional high counts observed. The pollen season can vary by as much as two weeks. Allergic reactions can occur when large quantities of pollen are released.</p>
<p class="p5"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p6">Some high, but mostly low and moderate counts are observed throughout the season for <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae"><span class="s2">pine, fir and spruce</span></a> from mid-April to mid-July. The season varies from year to year but not as much as in some of the other sites outside of British Columbia. Considered very important allergens to those individuals who are sensitized.</p>
<p class="p7">&nbsp;</p>
<p class="p5"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#plantains-plantago">Plantains</a></span> produce low counts from June to mid-September. May be of importance to those highly sensitized.</p>
<p class="p5"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar, cottonwood and aspen</a></span> produce very high counts which can cause allergic reactions. The season can start from the third week of March to the third week of April and end early to mid-May. The season can start early in warm years like 2010, 2012 and 2016.</p>
<p class="p5"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a></span> is rarely observed in our air samples at this site. This weed is not abundant and only occurs in small patches.</p>
<p class="p4"><strong>Predominant Spores for Vancouver Island, British Columbia</strong></p>
<p class="p5"><strong>Alternaria sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Alternaria">Alternaria</a></span> counts are in the low to moderate range. Some species are known to cause allergic reactions. The season with the highest counts is from August to the end of September.</p>
<p class="p5"><strong>Aspergillus sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The counts can be high from January to late fall.</p>
<p class="p5"><strong>Boletus sp.</strong></p>
<p class="p6">The counts for the <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Boletus"><span class="s2">Boletus</span></a> spore are very sporadic with moderate counts observed. It may be of significance in causing allergic reactions. The season with moderate and high counts is from mid-June to mid-October.</p>
<p class="p5"><strong>Botrytis sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Botrytis">Botrytis</a></span> may be a significant allergen. The season is from January to late fall and the counts are very sporadic. Some very high counts are observed throughout the season but the highest occur in the late summer and fall.</p>
<p class="p5"><strong>Cladosporium sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium">Cladosporium</a></span> is the most abundant spore found throughout the whole season. This spore exists all year round and very high counts are known to occur starting January to well into late fall.</p>
<p class="p5"><strong>Coprinus sp.</strong></p>
<p class="p6">The season for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Coprinus"><span class="s2">Coprinus</span></a> mushroom, where significant counts are observed, is from April to mid-October. It is considered an important allergen.</p>
<p class="p5"><strong>Diatrypaceae sp.</strong></p>
<p class="p6">Diatrypaceae counts are sporadic throughout the whole counting season. Very high counts can be observed from the end of January to mid-October. Not known to cause allergic reactions</p>
<p class="p5"><strong>Epicoccum sp.</strong></p>
<p class="p6">Some <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Epicoccum"><span class="s2">Epicoccum</span></a> species are known to cause allergic reactions. The main season, with low to moderate counts, is from May to mid-October. May not be a significant allergen.</p>
<p class="p5"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a></span>, commonly referred to as Powdery mildew has a season that runs from late January to well into October. There are very high counts in August and September and the season is very sporadic.</p>
<p class="p5"><strong>Ganoderma sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma">Ganoderma</a></span> commonly referred to as bracket fungus can produce significant counts from January to well into late fall. Very high counts are observed from April to late fall. It is considered an important allergen.</p>
<p class="p5"><strong>Helicomyces sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Helicomyces">Helicomyces</a></span> season is from February to mid-October producing very high counts from June to August. The season is very sporadic.</p>
<p class="p5"><strong>Leptosphaeria sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Leptosphaeria">Leptosphaeria</a></span> season starts mid-February to mid-October. The counts vary from day to day, which is probably due to the effect of weather. Mostly moderate, with occasional high, counts are observed.</p>
<p class="p5"><strong>Myxomycetes</strong></p>
<p class="p6">The season is very sporadic with low to moderate counts from June to the end of September.</p>
<p class="p5"><strong>Penicillium sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The counts can be high from January to late fall.</p>
<p class="p5"><strong>Pithomyces sp.</strong></p>
<p class="p6">The season for Pithomyces fungus is from June to the end of September producing low to moderate counts with some in the high range.</p>
<p class="p5"><strong>Polythrincium sp.</strong></p>
<p class="p6">The season if from June to the end of August with low to moderate counts. Allergenic properties are unknown.</p>
<p class="p5"><strong>Uredinales sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Uredinales">Uredinales</a></span>, aka Rusts produce low to moderate counts from May to mid-October. Not enough is known about their significance in causing allergic reactions at these levels.</p>
<p class="p5"><strong>Ustilaginales sp.</strong></p>
<p class="p6">The allergenic properties of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales"><span class="s2">ustilaginales</span></a> commonly referred to as Smuts are unknown. However, they belong to the Basidiomycota, which are associated to allergies and asthma. The season is from mid-April to mid-October with some high counts throughout the season.</p>
<p class="p4"><strong>Predominant Pollen for Mainland, British Columbia</strong></p>
<p class="p5"><strong>Alder (Alnus sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a></span> season starts from late February and ends late June. The counts fluctuate from low to moderate due to the number of species present and the effect of weather.</p>
<p class="p5"><strong>Birch (Betula sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#birch-betula">Birch</a></span> season starts between the first and second week of April and ends mid to late May. Some counts do get high making it an important allergen to those who have allergies to birch. The season varies from year to year due to the effect of weather.</p>
<p class="p5"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers, and yews</a></span> produce significant counts, in the moderate and high range, from early March to mid-May. May cause allergic reactions in those individuals who are highly sensitized.</p>
<p class="p5"><strong>Chenopodiaceae &amp; Amaranthaceae</strong></p>
<p class="p8">This group of weeds are similar microscopically and are not differentiated. They include some weeds, which are considered allergenic. Some moderate counts are observed from August to early September. The main season starts from about mid-June and ends around mid-October.</p>
<p class="p5"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p8">Elm are important allergens. The season can start as early as the beginning of March and end mid-April. The counts are sometimes in the moderate range. The season can last almost three weeks and can vary from year to year due to the effect of weather.</p>
<p class="p5"><strong>Grasses (Gramineae family)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae">Grasses</a></span> produce significant counts in the moderate and high ranges from the second week of May to mid-July. The season starts around mid-April and lasts to about mid-September.</p>
<p class="p5"><strong>Hazelnut (Corylus sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hazel-corylus">Hazelnut</a></span> season can occur starting late February and last until early April. Only low counts are observed and may be of no significance except to those highly sensitized.</p>
<p class="p5"><strong>Larch (Larix sp.)</strong></p>
<p class="p8">Larch season varies a great deal from year to year. The season start is from early to mid-April and the season end is from early to late May. Some years very little pollen is produced, other years the season lasts approximately one month and moderate counts are observed. Not known to cause allergic reactions.</p>
<p class="p5"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maple</a></span> season is not considered important for allergies since very little pollen is captured on our samples. This is due to the limited number of species present and that they are mostly insect pollinated or found at high elevations.</p>
<p class="p5"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#mugwort-artemisia">Mugwort</a></span> season is from late July to early October with low and the occasional moderate counts observed. Could be considered an important allergen in highly sensitized individuals.</p>
<p class="p5"><strong>Nettles (Urticaceae sp.) and parietaria</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica">Nettles</a></span> and parietaria season is from mid-May to the end of August. Only low counts are observed. Due to their small size they are considered important allergens.</p>
<p class="p5"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p8">Moderate and high counts of <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae"><span class="s2">pine, fir and spruce</span></a> are observed from early May to late July. The season is from mid-April or early May to late July or mid-August. The season varies from year to year. This group could be important in highly sensitized individuals due to the length of the season and the high pollen counts.</p>
<p class="p5"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar, cottonwood and aspen</a></span> season can start early March and can last until mid-May. The season fluctuates from year to year due to weather. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p5"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a></span> is not common and the pollen season is from the end of July to mid-September with only occasional low counts observed.</p>
<p class="p5"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#sagebrush-artemisia">Sagebrush</a></span> season is from late July to early October with low and the occasional moderate counts observed. Could be considered an important allergen in highly sensitized individuals.</p>
<p class="p5"><strong>Willow (Salix sp.)</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#willow-salix">Willows</a></span> pollinate generally from late March to mid-May. Some moderate counts are observed.</p>
<p class="p4"><strong>Predominant Spores for Mainland, British Columbia</strong></p>
<p class="p5"><strong>Alternaria sp.</strong></p>
<p class="p8">The counts for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Alternaria"><span class="s2">Alternaria</span></a> are mostly moderate with some in the high range. Some species are known to cause allergic reactions. The season is from early March to mid-October, with the highest counts occuring June through September.</p>
<p class="p5"><strong>Aspergillus sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall.</p>
<p class="p5"><strong>Boletus sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Boletus">Boletus</a></span> season is very sporadic with some high counts observed. It may be of significance in causing allergic reactions. The season with significant counts is May to well into October.</p>
<p class="p5"><strong>Botrytis sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Botrytis">Botrytis</a></span> may be a significant allergen, with mostly moderate counts observed. The season, with significant counts, is from mid-May to the end of September and the counts are very sporadic.</p>
<p class="p5"><strong>Cladosporium sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium">Cladosporium</a></span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p5"><strong>Coprinus sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Coprinus">Coprinus</a></span> &ndash; this mushroom produces moderate and high counts from April to mid-October. It is considered an important allergen.</p>
<p class="p5"><strong>Diatrypaceae sp.</strong></p>
<p class="p8">The counts for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Diatrypaceae"><span class="s2">Diatrypaceae</span></a> are sporadic throughout the whole collecting season. Very high counts can be observed from March to mid-October. They do not have any known allergic properties.</p>
<p class="p5"><strong>Epicoccum sp.</strong></p>
<p class="p8">Some species of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Epicoccum"><span class="s2">Epicoccum</span></a> are known to cause allergic reactions. The season is from July to mid-October with some moderate counts. May not be a significant allergen.</p>
<p class="p5"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a></span>, also known as Powdery mildew, season is from April to mid-October. Moderate and high counts are observed.</p>
<p class="p5"><strong>Ganoderma sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma">Ganoderma</a></span> also known as the bracket fungus can produce significant counts from early May to mid-October. It is considered an important allergen.</p>
<p class="p5"><strong>Helicomyces sp.</strong></p>
<p class="p8">The season for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Helicomyces"><span class="s2">Helicomyces</span></a> is very sporadic from May to the end of September producing moderate and some high counts.</p>
<p class="p5"><strong>Leptosphaeria sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Leptosphaeria">Leptosphaeria</a></span> season starts the end of May and runs through to the end of September. The counts vary from day to day, which is probably due to the effect of weather and the number of species present. Mostly moderate, with occasional high, counts are observed.</p>
<p class="p5"><strong>Myxomycetes</strong></p>
<p class="p8">Moderate counts are observed from May to mid-October. Season is sporadic.</p>
<p class="p5"><strong>Penicillium sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall.</p>
<p class="p5"><strong>Pleospora sp.</strong></p>
<p class="p8">This spore occurs from the end of May to early September and the season is sporadic. The counts are mostly in the moderate range.</p>
<p class="p5"><strong>Torula sp.</strong></p>
<p class="p8">The majority the <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Torula"><span class="s2">Torula</span></a> season is from late June to late August with mostly moderate counts.</p>
<p class="p7">&nbsp;</p>
<p class="p5"><strong>Uredinales sp.</strong></p>
<p class="p8">Rusts, the common name for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Uredinales"><span class="s2">Uredinales</span></a>, produce mostly moderate counts but not enough is known about their significance in causing allergic reactions at these levels. The season is from May to mid-October.</p>
<p class="p5"><strong>Ustilaginales sp.</strong></p>
<p class="p8"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales">Ustilaginales</a></span> spore is abundant at this location. The allergenic properties of the smuts are unknown, however, it belongs to the Basidiomycota which are associated with allergies and asthma. The season is from mid-April to mid-October with some very high counts from July to the end of September.</p>
<p class="p9">&nbsp;</p>
<p class="p4"><strong>Predominant Pollen for Vancouver City and surrounding region, British Columbia</strong></p>
<p class="p5"><strong>Alder (Alnus sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a></span> season can start mid-March to early April and end early to late June. Moderate and high counts can occur. Alders are considered important allergens.</p>
<p class="p5"><strong>Beech - Sylvatica and grandifolia (Fagus sp.)</strong></p>
<p class="p6">Sylvatica and grandifolia are two species present at this location. The <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#beech-fagus"><span class="s2">beech</span></a> some years produce moderate counts but the season varies a great deal from year to year due to the effect of weather. This is partly due to cyclical patterns and weather. The season can last from mid-April to mid-May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p5"><strong>Birch (Betula sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#birch-betula">Birch</a></span> season can start from mid-April to early May and end early to late June. Very high counts are observed and they are considered important allergens.</p>
<p class="p5"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers and yews</a></span> season starts from early to late March and ends late May to early June. Very high counts can be observed but most species in Canada are not considered allergenic.</p>
<p class="p5"><strong>Dock weed &amp; Sheep sorrel weed (Rumex sp.)</strong></p>
<p class="p6">The <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#dockweed-rumex"><span class="s2">dock and sorrel</span></a> season can start from early to mid-May and ends early August. The pollen is considered mildly allergenic.</p>
<p class="p5"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p6">Elm season can start between late January and early March and last from early to mid-April. Mostly low to moderate, with the occasional high, counts are observed. The elms are considered important allergens.</p>
<p class="p5"><strong>Grasses (Gramineae family)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae">Grasses</a></span> produce moderate counts, from June to the end of July, a few high counts can be observed for certain years. The season can start mid-May and end early October.</p>
<p class="p5"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p6">The <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hazel-corylus"><span class="s2">hazelnuts</span></a> produce some moderate counts during the months of January and February. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p5"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hemlocks-corylus">Hemlocks</a></span> produce low to moderate counts at this location and the season can occur between mid-March to late June. The season is very sporadic from year to year and lasts almost two months. May cause allergic reactions in individuals who are highly sensitized when shed in high numbers.</p>
<p class="p5"><strong>Larch and tamaracks (Larix sp.)</strong></p>
<p class="p6">Larch and tamaracks produce low to moderate counts. There are two seasons that can occur between late March to late May. This is probably due to the number of species present. The season lengths and amount of pollen produced can fluctuate a great deal from year to year.</p>
<p class="p5"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maples and Box Elder</a></span> can have a short early season from mid March to early April. The main season can start from early to mid-April and end mid to late May. Some very high counts are observed and some species are known to cause allergic reactions.</p>
<p class="p5"><strong>Nettles and parietaria (Urticaceae sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica">Nettles</a></span> and parietaria produce a few moderate counts from mid-May to late June. The season is sporadic. They are considered important in causing allergic reactions due to the small size of the pollen</p>
<p class="p5"><strong>Oak (Quercus sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#oak-quercus">Oak</a></span> season can occur from mid-April and end late May with a few moderate and very occasional high counts observed. The pollen season can vary by as much as two weeks. Allergic reactions can occur when large quantities of pollen are released.</p>
<p class="p5"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p6">Some high, but mostly low and moderate counts are observed throughout the season for <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae"><span class="s2">pine, fir and spruce</span></a> from mid-April to mid-July. The season varies from year to year but not as much as in some of the other sites outside of British Columbia. Considered very important allergens to those individuals who are sensitized.</p>
<p class="p5"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#plantains-plantago">Plantains</a></span> produce low counts from June to mid-September. May be of importance to those highly sensitized.</p>
<p class="p5"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar, cottonwood and aspen</a></span> produce very high counts which can cause allergic reactions. The season can start from the third week of March to the third week of April and end early to mid-May. The season can start early in warm years like 2010, 2012 and 2016.</p>
<p class="p5"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a></span> is rarely observed in our air samples at this site. This weed is not abundant and only occurs in small patches.</p>
<p class="p4"><strong>Predominant Spores for Vancouver City and surrounding region, British Columbia </strong></p>
<p class="p5"><span class="s3">&nbsp;</span><strong>Alternaria sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Alternaria">Alternaria</a></span> counts are in the low to moderate range. Some species are known to cause allergic reactions. The season with the highest counts is from August to the end of September.</p>
<p class="p5"><strong>Aspergillus sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The counts can be high from January to late fall.</p>
<p class="p5"><strong>Boletus sp.</strong></p>
<p class="p6">The counts for the <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Boletus"><span class="s2">Boletus</span></a> spore are very sporadic with moderate counts observed. It may be of significance in causing allergic reactions. The season with moderate and high counts is from mid-June to mid-October.</p>
<p class="p5"><strong>Botrytis sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Botrytis">Botrytis</a></span> may be a significant allergen. The season is from January to late fall and the counts are very sporadic. Some very high counts are observed throughout the season but the highest occur in the late summer and fall.</p>
<p class="p5"><strong>Cladosporium sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium">Cladosporium</a></span> is the most abundant spore found throughout the whole season. This spore exists all year round and very high counts are known to occur starting January to well into late fall.</p>
<p class="p5"><strong>Coprinus sp.</strong></p>
<p class="p6">The season for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Coprinus"><span class="s2">Coprinus</span></a> mushroom, where significant counts are observed, is from April to mid-October. It is considered an important allergen.</p>
<p class="p5"><strong>Diatrypaceae sp.</strong></p>
<p class="p6">Diatrypaceae counts are sporadic throughout the whole counting season. Very high counts can be observed from the end of January to mid-October. Not known to cause allergic reactions</p>
<p class="p5"><strong>Epicoccum sp.</strong></p>
<p class="p6">Some <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Epicoccum"><span class="s2">Epicoccum</span></a> species are known to cause allergic reactions. The main season, with low to moderate counts, is from May to mid-October. May not be a significant allergen.</p>
<p class="p5"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a></span>, commonly referred to as Powdery mildew has a season that runs from late January to well into October. There are very high counts in August and September and the season is very sporadic.</p>
<p class="p5"><strong>Ganoderma sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma">Ganoderma</a></span> commonly referred to as bracket fungus can produce significant counts from January to well into late fall. Very high counts are observed from April to late fall. It is considered an important allergen.</p>
<p class="p10">&nbsp;</p>
<p class="p5"><strong>Helicomyces sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Helicomyces">Helicomyces</a></span> season is from February to mid-October producing very high counts from June to August. The season is very sporadic.</p>
<p class="p5"><strong>Leptosphaeria sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Leptosphaeria">Leptosphaeria</a></span> season starts mid-February to mid-October. The counts vary from day to day, which is probably due to the effect of weather. Mostly moderate, with occasional high, counts are observed.</p>
<p class="p5"><strong>Myxomycetes</strong></p>
<p class="p6">The season is very sporadic with low to moderate counts from June to the end of September.</p>
<p class="p5"><strong>Penicillium sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a></span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The counts can be high from January to late fall.</p>
<p class="p5"><strong>Pithomyces sp.</strong></p>
<p class="p6">The season for Pithomyces fungus is from June to the end of September producing low to moderate counts with some in the high range.</p>
<p class="p5"><strong>Polythrincium sp.</strong></p>
<p class="p6">The season if from June to the end of August with low to moderate counts. Allergenic properties are unknown.</p>
<p class="p5"><strong>Uredinales sp.</strong></p>
<p class="p6"><span class="s2"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Uredinales">Uredinales</a></span>, aka Rusts produce low to moderate counts from May to mid-October. Not enough is known about their significance in causing allergic reactions at these levels.</p>
<p class="p5"><strong>Ustilaginales sp.</strong></p>
<p class="p6">The allergenic properties of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales"><span class="s2">ustilaginales</span></a> commonly referred to as Smuts are unknown. However, they belong to the Basidiomycota, which are associated to allergies and asthma. The season is from mid-April to mid-October with some high counts throughout the season.</p>`,
    },
    {
      id: 3,
      name: 'Manitoba',
      html: `<p class="p1"><strong>Predominant Pollen in the Winnipeg, Manitoba region</strong></p>
<p class="p2">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can begin from the end of March to mid-April, depending on the weather. The season can end early to late June. The counts fluctuate from low to moderate throughout the season and the occasional high count can be observed. This is due to the number of species present and the effect of weather. They can be considered important allergens.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">This group of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Moderate counts are observed from August to mid-September. The season lasts from about mid-June to early October.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can begin from mid-April to the third week of May and ends late-May to mid-June. The total pollen produced can vary a great deal at this location. The season can fluctuate by a month depending on the weather. Some of the counts are high and may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can vary by as much as a month from year to year. The start of season can be from the third week of April to the third weeek of May and can end late May to mid-June. Low to high counts are observed. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews&rsquo;</span> season is very sporadic. The season can start mid-March to mid-April and ends early to late June. Mostly low and moderate counts (high counts occasionally occur depending on the season). The season fluctuates due to the effect of weather. Probably of no significance in causing allergic reactions.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. The pollen levels, as well as the timing for the pollen season, vary a great deal at this site. This has to do with the winter and spring temperatures as well as the number of species present. In warm years, like 2012, the season can start as early as late March. Generally the season starts early April to early May and end from early May to late May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce moderate and high counts from the end of May to the end of July. The season is from mid-May to almost mid-October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> have a season lasting approximately two to three weeks. The season can start early to late April and end late April to mid-May. Mostly low, with the occasional moderate, counts are observed.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies due to the effect of weather. Significant counts can be observed from mid-April to late May with some moderate and high counts. The season can start from early to late April and end from mid-May to early June.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugworts</span> can cause allergic reactions. The season can start from mid to late July and ends early to mid-October. Some moderate counts occur from August to mid-September.</p>
<p class="p3"><strong>Mustards and Cabbage (Brassica sp.)</strong></p>
<p class="p4"><span class="s1">Mustard and cabbage</span> family are responsible for contact dermatitis and food allergies. They are not considered important in airborne allergies since they are mostly insect pollinated but a significant amount of pollen is observed in our samples at this location. The season starts late June to mid-July and lasts until mid to late August. Mostly low, with the occasional moderate, counts are observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria occur in significant numbers that may cause allergic reactions. The season can start from mid-June to early July and ends around mid-September. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oaks</span> can have two seasons. Seasons can start from late April to late May and end late May to the third week of June. Some years the early season is almost non-existant due to the effect of weather. Oaks are highly allergenic.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Very high counts are observed at this site for <span class="s1">pine, fir and spruce</span>. The season can start early to late May and can end late June to late July. This group is very important to those who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> can play an important role in allergic reactions, even at low levels. The counts are only in the low ranges from late June to mid-September.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start late March to late April and end early to late May. The counts can get high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> pollen season can start from the second week to the third week of July and end mid-October or with a hard frost. Moderate and high counts occur from August to mid-September. They are considered important allergens.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrushes</span> can cause allergic reactions. The season can start from mid to late July and ends early to mid-October. Some moderate counts occur from August to mid-September.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> can vary a great deal from year to year. Not only in the start and end dates but also the amount of pollen produced. The season can start from mid-April to mid-May and end late May to mid-June. May not cause allergic reactions except in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Spores in the Winnipeg, Manitoba region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from mid-March to well into October. The highest counts are observed from July to mid-October.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from mid-March and well into fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts get very high and may be of significance in causing allergic reactions. The season is late June to early October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen although the counts do not get very high. The season is from May to mid-October.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce very high counts from mid-May to mid-October. It is considered to be an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic with high counts throughout the counting season. The season is from late March to mid-October. Not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are never very high. This is a summer and fall spore, with moderate counts occuring in August and September. There are other related genera, which are also found in air samples that can cause respiratory problems. One example is Bipolaris sp.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">Epicoccum</span> are known to cause allergic reactions. The season, with significant counts, is from July to mid-October.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, commonly referred to as powdery mildew, season is from late April to mid-October. Low to high counts are observed with daily fluctuations occuring.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from mid-May to the end of September with some high counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to the end of September. Can be a significant allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing moderate and high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is from April to early October with great fluctuations in counts from day to day. This is probably due to the effect of weather. Very high counts are observed from late May to late September. Could be significant in causing allergic reactions. No known allergic properties.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate and high counts are observed from April to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from mid-March and well into fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate ranges from the end of June to mid-October.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season, with moderate counts, is from August to the end of September. Low counts can be observed from June to mid-October.</p>
<p class="p3"><strong>Torula sp.</strong></p>
<p class="p4"><span class="s1">Torula sp.</span> can cause allergic reactions. The season is from June to mid-October with low to moderate counts.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span>, also know as rusts, do produce high numbers but not enough is known about their significance in causing allergic reactions. The season is from late May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span>, also know as smuts, can reach very high counts, and their allergenicity is unknown. The season is April to mid-October.</p>
<p class="p1"><strong>Predominant Pollen in the Brandon, Manitoba region</strong></p>
<p class="p2">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> fluctuates, most years, from low to moderate counts throughout the season due to the number of species and the effect of weather. Rare high counts can occur. The season can start from late March to mid-May and end the first week of June to the end of June.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">This group of weeds are similar microscopically and are not differentiated. They include some weeds which are considered highly allergenic. The counts are mostly in the low to moderate range, with the occasional high count observed. The season can start from late June to mid-July and ends late September to mid-October.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> do produce some very high counts and may be significant allergens. The season can last up to a month and the time of the pollen season can fluctuate due to weather. The season can start mid-April to mid-May and end mid-May to early June. Most years the counts do get high with many low and moderate counts observed.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can vary by as much as a month. Counts can be in the very high range. The season can start from mid-April to mid-May and end late May to mid-June.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> produce very sporadic counts with moderate and high counts occuring during the month of April to early May. The season can start mid to late March and end early to mid-June. The season fluctuates due to the effect of weather. May not be of significance in causing allergic reactions.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are considered important allergens. There is short early season that lasts about one week and it can occur late March to mid-April. The main season lasts approximately two weeks, with some very high counts, and can occur from mid to late April and end early to late May. The season fluctuates a great deal from year to year due to the effect of weather.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce significant counts in June and July. The counts are mostly in the moderate range, with a few high counts, during this period. The season starts from mid-May to early June and ends mid-October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> have a season lasting approximately two to three weeks and moderate counts can be observed. The pollen season can start from early to late April and end late April to mid-May.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4">With <span class="s1">maple trees</span> there is an early and short season that may occur from late March to mid-April. The main season can start from mid to late April and end mid-May to early June. The difference in seasons from year to year is due to the effect of weather and the spring temperatures.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugworts</span> can cause allergic reactions. The main season can start from mid to late July and end mid-October. Significant counts, in the moderate range, occur in August and September.</p>
<p class="p3"><strong>Mustards and Cabbage (Brassica sp.)</strong></p>
<p class="p4"><span class="s1">Mustard and cabbage</span> family are responsible for contact dermatitis and food allergies. They are not necessarily considered important in airborne allergies, since they are mostly insect pollinated, but a significant amount of pollen is observed in our samples at this location. The season can start late June and can last until late August. Mostly low and moderate counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria occur in significant numbers and they are considered important allergens. The season is from mid to late June and ends early to mid-September.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> is considered to be an important allergen. There are two distinct seasons; one at the end of April to the beginning of May, and lasts about one week with mostly low counts (moderate counts are possible). The second season has high counts and can occur from early May to early June lasting approximately three weeks ending from late May to the third week of June. Some of the oaks are considered important allergens.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Some very high counts can be observed for <span class="s1">pine, spruce and firs</span>. The season can start from early to mid-May and ends early to late July. There is a month&rsquo;s difference in when the season can occur. This group is very important to those who have allergies to these trees.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> counts are in the low range but highly sensitized individuals may react even at these levels. The season can start mid to late June and ends early September.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from early to mid-April and ends early to late May. There are some very high counts, which may cause allergic reactions to individuals who are highly sensitized.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season begins mid-July and ends well into October. Moderate counts are observed from the second week of August to mid-September.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrushes</span> can cause allergic reactions. The main season can start from mid to late July and end mid-October. Significant counts, in the moderate range, occur in August and September.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> produce mostly low and moderate counts with the occational high count, depending on the year. The season can last four to five weeks. Season start is from mid-April to early May and ends late May to almost mid-June. The fluctuation in the season is due to the effect of weather. May only cause allergic reactions in highly sensitized individuals.</p>
<p class="p5">&nbsp;</p>
<p class="p1"><strong>Predominant Spores in the Brandon, Manitoba region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> season happens from April to mid-October. Very high counts are observed from mid-June to mid-October. Some species are known to cause allergic reactions. It may be an important allergen.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed throughout the whole season, from March to mid-October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts do get high and may be of significance in causing allergic reactions. The season is July to the end of September with the highest counts observed in August.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen although the counts do not get very high. The season is sporadic from late May to the end of September.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprius</span> mushroom can produce very high counts from mid-May to mid-October. Can be an important allergen.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic with some very high counts. The season is from late March to early October.No known allergic properties.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are never very high for Drechslera. This is a summer and fall spore. There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is Bipolaris sp.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">Epicoccum</span> are known to cause allergic reactions. The season with significant counts is from July to mid-October and some high counts are observed.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from mid-April to mid-October. The counts are sporadic. May not cause allergic reactions.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from mid-May to the end of September with some high counts. This fungus is well known to cause food spoilage, reactions when the toxin is ingested and other allergic reactions.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span>, commonly referred to as bracket fungus can produce high counts from June to the end of September. Can be a significant allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from late May to the end of September producing moderate and high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">The heaviest counts of <span class="s1">leptosphaeria</span> are observed from May to the end of September with great fluctuations in counts from day to day. This is probably due to the effect of weather. Very high counts are observed. Could be significant in causing allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate and high counts are observed from May to mid-October. Allergenic properties are not well understood.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed throughout the whole season, from March to mid-October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range and the highest counts are observed from the end of July to mid-October.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">Stemphylium season is from mid-July to the end of September with spore counts in the low to moderate range.</p>
<p class="p3"><strong>Torula sp.</strong></p>
<p class="p4"><span class="s1">Torula</span> can cause allergic reactions. The season with significant counts, in the low to moderate ranges, is from the end of June to mid-October with mostly moderate counts.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span>, also know as rusts do produce very high counts but not enough is known about their significance in causing allergic reactions. The main season is from June to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts can reach very high counts. Allergenicity is unknown. The season is May to mid-October.</p>
<p class="p6">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->`,
    },

    {
      id: 4,
      name: 'Newfoundland ',
      html: `<p class="p1"><strong>Predominant Pollen for the St. John&rsquo;s, Newfoundland region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alders</span> have a very short early season from late March to early April. The majority of the season occurs from early May to late June. The season is highly affected by weather and can be sporadic at times. The alder can cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from year to year due to cyclical patterns and the effect of weather. Low counts to high counts are observed depending on the year. The season can start late the third week of May to the first week of June and end the second to the last week of June. The amount of pollen captured is also dependant on where the sampler is located.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> pollen season can vary from year to year. Low to high counts can be observed and are often sporadic. The season can start from the third week of April to the third week of may and end late may to late June.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span>&lsquo; produce low to moderate counts, with high counts possible some years. A short early season can occur around late March to early April. The main season can start the second to last week of April and end the second week of June to early July. Most species in Canada are not known to cause allergic reactions.</p>
<p class="p3"><strong>Compositae family</strong></p>
<p class="p4">A group of weeds which are similar microscopically and can be wind or insect pollinated. Some of the weeds in this group can cause allergic reactions and moderate counts are observed in June.</p>
<p class="p3"><strong>Dock weed &amp; Sheep sorrel weed (Rumex sp.)</strong></p>
<p class="p4">The season for <span class="s1">dock weed &amp; sheep sorrel weed</span> can start late May to the third week of June and end mid-August. Mostly low, with the occasional moderate, counts are observed.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elms</span> can be important allergens. The season can be sporadic which is mostly due to the effect of weather. Some years moderate counts are observed but most years only low counts are captured. The season can start the third week of April to the third week of May and end the second to the last week of May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season can start mid-May to mid-June and end late September to mid-October. The highest counts are observed from the second week of June to early August.</p>
<p class="p3"><strong>Larch &amp; Tamaracks (Larix sp.)</strong></p>
<p class="p4">Larch and tamaracks produce low to moderate counts, depending on the year, and the pollen season varies a great deal from year to year due to cyclical patterns and the effect of weather. The season can start from the first to the third week of May and end the third week of May to early June. They have been associated with allergic reactions.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season has a short season with only low counts which occurs for the last week of April to early May. The main season starts from the third week of May to the third week of June and ends third week of June to the first week of July. The season can be sporadic due to the effect of weather. Some years moderate counts are possible. Certain species are known to cause allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4">The counts for the <span class="s1">nettles</span> are always low but they are important allergens due to their small size. The season can start from mid-June to early July and end early to mid-September.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season is highly affected by weather. The season can start from early May to late June and end the third week of June to mid-July. Some years only low counts are observed but other years moderate counts are obtained. Some species can cause reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4"><span class="s1">Pine, spruce and firs</span> season can vary both in pollen counts and when the pollen season occurs. Counts fluctuate a great deal throughout the season from low to high levels. The season can start mid-May in warm years like 201 and 2012. Generally the season starts early June and ends late June to mid-July. They are of significance in causing allergic reactions in individuals who are sensitized.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> produce low counts. The season can start from the third week of June to the second week of July and end mid to late September. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4">The pollen season for <span class="s1">poplar and aspen</span> can vary drastically from year to year. The season can start form early to late April and end mid-May to early June. There are usually just a few days where relevant counts are observed at this collection site. This has to do with the great fluctuations in temperature and the abundance of rain during the season. They may not cause allergic reactions at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> counts are always low and very sporadic. Season can start early August and end mid-October.</p>
<p class="p1"><strong>Predominant Spores for the St. John&rsquo;s, Newfoundland region</strong></p>
<p class="p6">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> occurs throughout our counting season from March to the end of October. Highest counts are from August to early October. They are considered important allergens.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4">Spore counts for <span class="s1">boletus</span> mushroom can reach very high numbers from the end of July well into October. Can be a significant allergen.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> fungal spore is considered to be a significant allergen. Season is from early June to early October.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4">Very high numbers of <span class="s1">cladosporium</span> are recorded. Occurs throughout the year with significant counts occurring from March to well into October. The highest counts occur from June to mid-October.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">The majority of the coprinus season is from July to well into October. Considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp</strong></p>
<p class="p4">Very sporadic counts of <span class="s1">diatrypaceae</span> are observed throughout all of our collecting season, and the highest numbers are found in cool wet weather. Clinical significance in unknown.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">epicoccum</span> are observed in July and August. May not play a significant role in allergies except to those individuals who are highly sensitized.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from May to mid-October.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts fluctuate a lot throughout the counting season which is normal for this fungus. Majority of the season is June to mid-October.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> fungus can produce very high spore numbers and the majority of the season is from mid-June to mid-October. Can be a significant allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">helicomyces</span> are observed. Most of the season is from May to early October. Medical significance is unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is May to mid-October with great fluctuations in counts from day to day which is probably due to the effect of weather.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from May to early October. Allergenicity is not well understood.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> occurs throughout our counting season from March to the end of October. Highest counts are from August to early October. They are considered important allergens.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">pithomyces</span> are observed from August to the end of September. Medical significance is unknown.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Moderate counts of polythrincium are observed from late July to early October. Medical significance is unknown.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> season with significant counts is from mid-June to mid-October. Allergenicity at these levels is not well understood.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">High counts of <span class="s1">ustilaginales</span> occur from June to mid-October. Allergenicity at these levels is not well understood.</p>
<p class="p7">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->`,
    },
    {
      id: 5,
      name: 'New Brunswick',
      html: `<p class="p1"><strong>Predominant Pollen for the Fredericton, New Brunswick region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season varies greatly from year to year and can be the result of the effect of weather and cyclical patterns. The counts can reach high levels. The season can start from mid-March to mid-April and ends early to mid-June.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season can start from the third week of April to early May and ends the third week of May to almost mid-June. High counts are observed. May cause allergic reactions.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from year to year due to cyclical patterns and the effect of weather. Low counts are generally observed but moderate counts are possible in certain years. The season can start early to late May and end late May to mid-June. May cause reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">Very high <span class="s1">birch</span> counts are observed, the season can last almost two months and can start from mid-April to early May and end early to late June.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> can produce high counts from April to early May. There is a short season mid to late March. The main season can start from the third week of March to mid-April and end late May to the second week of June.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4">Elms have an early low season that can occur in March. The main season can start late March to early April in warm years like 2010 and 2012 but generally it starts around the third week of April. The main season can have very high counts. The season can end from the first week to last week of May. At these levels they are considered important allergens.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4">Heaviest counts for the <span class="s1">grass</span> season occur in June and July. Low and moderate counts are observed and the season starts the first to the last week of May and ends late September.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlocks</span> usually only produce low counts but rarely moderate counts can occur. The season varies a great deal from year to year due to the effect of weather and cyclical patterns. The season can start from mid-May to early June and end from the first to the second week of June.</p>
<p class="p3"><strong>Larch (Larix sp.)</strong></p>
<p class="p4">Larch and tamarack can vary a great deal from year to year due to the effect of weather and cyclical patterns. Some years only low and sporadic counts are observed while other years moderate counts are captured. The season can start from the third week of April to early May and end early to late May.</p>
<p class="p3"><strong>Linden, Basswood, Lime Trees (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Linden and basswood</span> season can vary from year to year. The season can start around the first week of July and end the third week of July to early August. Mostly low counts are observed with the occasional moderate possible. Some years only sporadic low counts are observed. The variation in seasons is due to the effect of weather and cyclical patterns.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season is affected by the weather in when it will occur and how much pollen will be released. In the warm years, like 2010 and 2012, the season started the second the third week of March.</p>
<p class="p4">Generally the season can start from early to mid-April and end mid to late May. Very high counts are observed and some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> occur only in low numbers. The season can start late June to early July and end late August to early September. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can vary from year to year due to the effect of weather. The season can start the third week of April to mid-May and end late May to mid-June. Moderate and high counts are observed. Some species are known to cause allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">The season for the pine, spruce and firs lasts at least two months. Some very high counts are observed. The season can start from the second week to the third week of May and end the first to the third week of July. Very high counts are observed and they could be very important allergens for those individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> pollinate from late June to late September. The counts are mostly in the low range with an occasional moderate possible. This may cause allergic reaction in highly sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season lasts well over a month. The season can start the 3rd week of March in warm years like 2011 and 2012. Generally the season starts from the first to the third week of April and end early May to the last week of May. Some very high counts are observed and they can cause allergic reactions at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> only produces low counts. The season can start the third week of July to the second week of August and end late September to early October, or with a hard frost.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4"><span class="s1">Walnuts</span> are considered important in causing allergic reactions. The pollen season can start from early May to the third week of May and can end the second to last week of June.</p>
<p class="p4">The season can vary a great deal from year to year due to weather and cyclical patterns. Low and sometimes sporadic counts will be observed whereas an occasional year can produce moderate counts.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season can produce moderate and high counts. The season can start from late April to early May in warm years like 2010 and 2012. Generally the season starts from the first to the second week of May and ends late May to the second week of June. They can cause allergic reactions at these levels.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p1"><strong>Predominant Spores for the Fredericton, New Brunswick region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Most of the significant counts of <span class="s1">alternaria</span> are found from mid-June to the end of September.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">aspergillus</span> occur throughout the whole counting season with high counts occurring from late May to early October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season is from mid-June to mid-October and very high counts can occur. Considered an important allergen.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> counts are very sporadic. They can occur in the moderate ranges from late April to October.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Moderate and high counts of caloplaca are observed from April to early October. The counts are very sporadic.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is found throughout the whole counting season. The highest counts are observed from late March to early October.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">coprinus</span> are observed. Season is from mid-May to late fall. Very high counts are observed from July to Mid-October. Considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are very sporadic and vary throughout the whole counting season. They are not known to cause allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">epicoccum</span> are observed from mid-July to early October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from late April to mid-October and we find significant counts during this period. Highest counts are mostly in the moderate range.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to mid-October with some high counts. It is known to cause allergic reactions.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">ganoderma</span> are observed from mid-June to late fall. Considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> counts fluctuate throughout the season with low to high counts from late April to mid-October.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is the end of May to mid-October with great fluctuations in counts from day to day. This is probably due to the effect of weather. The significant counts are mostly in the moderate range.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from mid-June to late September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">penicillium</span> occur throughout the whole counting season with high counts occurring from late May to early October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">pithomyces</span> are observed in August and September.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Moderate counts of polythrincium are observed from July to late September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> or rusts produce low and moderate numbers from mid-May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts produce low and moderate counts from late May to mid-October.</p>
<p class="p1"><strong>Predominant Pollen for the Moncton, New Brunswick region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><span class="s2">&nbsp;</span><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season varies greatly from year to year and can be the result of the effect of weather and cyclical patterns. The counts vary from low to high. There is a small early season with low counts from mid to late March.</p>
<p class="p4">The main season can start from the third week of March to the second week of April and end the first to the last week of June. They are considered to be important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season can start from the third week of April to early May and ends the third week of May to almost mid-June. Most counts are low with an occasional moderate count observed. May cause allergic reactions.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary from year to year due to cyclical patterns and the effect of weather. Low counts are generally observed. The season can start the first to the third week of May and end the third week of May to mid-June.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from mid-April to early May and end early to late June. Very high counts are observed. They are considered important allergens.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> can produce high counts from April to early May. There is a short season mid to late March. The main season can start from the third week of March to mid-April and end late May to the second week of June.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> season and pollen levels is very dependent on the site location. An early low season can occur from mid to late March. The main season can have moderate and occasional high counts, depending on the site location. Season start is from the first to the third week of April and ends late April to the second week of May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4">Highest counts for the <span class="s1">grass</span> season occur from mid-June to the third week of July. The season can start from the second to the third week of May and end late September to early October. They are considered important allergens.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary from year to year due to cyclical patterns and the effect of weather. Some years only low sporadic counts are observed, other years moderate counts are possible. The season can start the third week of May to the end of may and end the first to the third week of June.</p>
<p class="p3"><strong>Larch (Larix sp.)</strong></p>
<p class="p4">Larch and tamarack can vary a great deal from year to year due to the effect of weather and cyclical patterns. Most years only low counts are observed while other years moderate counts are possible. The season can start from the third week of April to early May and end the first to the third week of May.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season is effected by the weather in when it will occur and how much pollen will be released. The main season, where low to high counts will be observed, lasts almost two months.</p>
<p class="p4">The season can start late March to mid-April and end late May to mid-June. Very high counts are observed and some species are known to cause allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> occur only in low numbers. The season can start late June to early July and end late August to mid-September. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season varies a great deal from year to year due to the effect of weather. An early short season may occur from late April to mid-May. The more stable season with moderate and low counts can occur from the second to the last week of May. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4"><span class="s1">Pine, spruce and fir</span> season lasts more than two months with very high counts observed. The season can start from the first to the third week of May and end the first to the third week of July. They are very important allergens for those individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> season can start from the first to the third week of June and end the third week of September to early October. The counts are in the low range but they may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season lasts well over a month. The season can start late March to mid-April and end early May to the last week of May. Some very high counts are observed and they can cause allergic reactions at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can start from the third week of July to early August and lasts until mid-October or until a hard frost occurs. Mostly low counts are observed with the occasional moderate counts possible.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season can be sporadic with mostly low and rare moderate counts. During warm springs like 201 and 2012 the season can start the second week of April. Generally the season starts the third week of April to early May and ends the third week of May. May cause allergic reactions in highly sensitized individuals.</p>
<p class="p4">&nbsp;</p>
<p class="p1"><strong>Predominant Spores for the Moncton, New Brunswick region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><span class="s2">&nbsp;</span><strong>Alternaria sp.</strong></p>
<p class="p4">Most of the significant counts of <span class="s1">alternaria</span> are found from mid-June to the end of September.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">aspergillus</span> occur throughout the whole counting season with high counts occurring from late May to early October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season is from mid-June to mid-October and very high counts can occur. Considered an important allergen.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> counts are very sporadic. They can occur in the moderate ranges from late April to October. Possible cause of allergies. The fact that it is found in food is also a method that it could cause allergic sensitivity. May be associated with corneal trauma and infections as it is found in the scrapings.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Moderate and high counts of caloplaca are observed from April to early October. The counts are very sporadic.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is found throughout the whole counting season. The highest counts are observed from late March to early October. Certain species can cause deep skin infections and can invade the central nervous system. They can cause sinusitis, respiratory diseases, and subcutaneous mycoses. May also cause keratomycosis and allergies.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">coprinus</span> are observed. Season is from mid-May to late fall. Very high counts are observed from July to Mid-October. Coprinus is considered an important allergen.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are very sporadic and vary throughout the whole counting season. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">epicoccum</span> are observed from mid-July to early October.Can be the cause of allergies (hay fever and asthma).</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, season with significant counts runs generally from late April to mid-October. Highest counts are mostly in the moderate range.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to mid-October with some high counts. It is known to cause allergic reactions.<br /> May be important source of health problems since large numbers do get airborne and they are a common food contaminant. Some species produce potent toxins and when infected food is ingested it can affect the following systems: circulatory, alimentary, skin and nervous. This can also be caused by inhalation of the spores.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">ganoderma</span> are observed from mid-June to late fall. Considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> counts fluctuate throughout the season with low to high counts from late April to mid-October.Considered to be saprophytic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is the end of May to mid-October with great fluctuations in counts from day to day. This is probably due to the effect of weather. The significant counts are mostly in the moderate range.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from mid-June to late September.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">penicillium</span> occur throughout the whole counting season with high counts occurring from late May to early October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">pithomyces</span> are observed in August and September. Etiologic agent in immune-compromised patients. Can cause disease in animals. Allergenicity not well established.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Moderate counts of polythrincium are observed from July to late September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span>, also know as rusts, produce low and moderate numbers from mid-May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts produce low and moderate counts from late May to mid-October.</p>
<p class="p6">&nbsp;</p>
<p class="p1"><strong>Predominant Pollen for the Saint John, New Brunswick region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from the third week of March to mid-April and end mid to late June. Some high counts are possible but not all years. They are considered important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season lasts approximately four weeks with low to high counts. The season can start from the third week of April to the second week of May and end the third week of May to mid-June. At these levels they would cause allergic reactions in sensitized individuals.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from year to year due to cyclical patterns and the effect of weather. Low counts are generally observed but moderate counts are possible in certain years. The season can start late April to the third week of May and end late May to mid-June.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from the second to the last week of April and end early to late June. Some very high counts are observed and they are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> produce low to high counts lasting approximately four to five weeks. The season can start mid-March to early April and end mid-May to early June. High counts are observed. Most species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elms</span> are an important allergen. The season can be sporadic which is mostly due to the effect of weather. Some years moderate counts are observed. The season can start late March to mid-April and end late April to the third week of May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season starts with low counts in May. The season with moderate counts is from mid-June to the third week of July. The season ends late September.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlocks</span> usually only produce low counts but rarely moderate counts can occur. The season varies a great deal from year to year due to the effect of weather and cyclical patterns. The season can start from mid-May to early June and end from the first to the third week of June.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season starts late March to the third week of April and ends second to last week of May. Mostly low, with the occasional moderate, counts are observed. Certain species are known to cause allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4">Counts for <span class="s1">nettles</span> are always low but they are important allergens due to their small size. The season can start from mid-June to early July and end early to mid-September.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season are effected by weather. The first season can start from late April to mid-May , whereas the more stable season can occur late April to mid-May. The season can end late May to mid-June. High counts are observed and some species can cause reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4"><span class="s1">Pine, spruce and fir</span> season can start first to last week of May and ends the first to last week of July. Very high counts are observed. They are important allergens to people who are sensitized</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> counts are always low but even at these levels the plantains can cause allergic reactions in some individuals. The season starts from mid to late June and ends late September.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season with low to moderate and occasional high counts are observed. The season generally can start from the second to last week of April. During warm years like 2010 and 2012 the season can start as early as the last week of March to the first week of April. There is also a large variation as to when the season can end which is from the first to the last week of May.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4">Only low counts of <span class="s1">ragweed</span> are observed at this site and the season can start from mid-July to mid-August and last until late September to mid-October.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4">Only low counts are observed for <span class="s1">willows</span> generally. The season can start mid-April to early May and end late May to early July.</p>
<p class="p1"><strong>Predominant Spores for the Saint John, New Brunswick region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Most significant counts of <span class="s1">alternaria</span> are found from July to mid-October. Counts may not be high enough to cause allergic reactions except in highly sensitized individuals.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">asperigillus</span> occur throughout the whole counting season with the highest counts occurring late summer and fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season is from June to mid-October with moderate to high counts. May be considered allergenic.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> counts are mostly in the low to high ranges from June to early October.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Low to moderate counts are observed from April to early October. May not be of any significance in causing allergic reactions.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is found throughout the whole counting season. Low to moderate counts occur from March to June. The highest counts are observed from June to late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">High counts of <span class="s1">coprinus</span> are observed from June to late October. Considered to be a significant allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> spore counts are very sporadic and vary throughout the whole counting season. The highest counts are from the end of March to early October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Mostly low counts of <span class="s1">epicoccum</span> are observed from June to mid-September. Some moderate counts are observed late September to mid-October. May not cause allergic reactions except in highly sensitized individuals.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from mid-April to the end of September. High counts are observed. They may not be of importance in causing allergies.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">ganoderma</span> are observed from mid-June to late fall. Considered to be a significant allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> counts fluctuate throughout the season with moderate to high counts from May to October. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season runs from May to the end of September with great fluctuations in counts from day to day. This is probably due to the effect of weather. The significant counts, which are mostly in the moderate range, may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from late April to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">penicillium</span> occur throughout the whole counting season with the highest counts occurring late summer and fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Only low counts of pithomyces are observed from June to early October.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Low to moderate counts of polythrincium are observed from July to late September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also known as rusts produce low to moderate counts from late May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts produce low to high counts from June to late October.</p>
<p class="p6">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->`,
    },
    {
      id: 6,
      name: 'Nova Scotia',
      html: `<p class="p1"><strong>Predominant Pollen for the Halifax, Nova Scotia region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p3" style="text-align: left;"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a></span> season is highly affected by weather. The main pollen season can start from late March to mid-April and end mid to late June. Mostly low and moderate, with the occasional high, counts are observed. They are important allergens and at these levels could cause allergic reactions.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ash-fraxinus">Ash</a></span> pollen season lasts well over a month. The seasons vary from year to year with most years only low and moderate counts observed. Some years high counts are possible. The season can start from early to late May and ends late May to mid-June. The season start and amount of pollen produced is very dependant on weather.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#beech-fagus">Beech</a></span> season can vary a great deal from year to year due to cyclical patterns and the effect of weather. Low counts are generally observed but moderate counts are possible in certain years. The season can start from the second to the third week of May and end from the third week of May to mid-June.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#birch-betula">Birch</a></span> can reach very high counts and the season can start from mid-April to early May and can end from the first week to the third week of June.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers, and yews</a></span> produce low to moderate counts, with the occasional high count, throughout the pollen season. The season can vary a great deal and can start from late March to mid-April and end from early to mid-June.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#elm-ulmaceae">Elm</a></span> season can vary in Halifax depending on where the sampling site is located. There is a season that can occur late May to early June with the Chinese elm but this is very site dependant. The main season for the elm can start from mid-April to early May and end early to mid-May. Low to high counts can be observed depending on sampling location and the weather.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4">Low and moderate counts are observed for <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae"><span class="s1">grasses</span></a> with the highest counts occurring from early June to late July.The season can start from mid-May to early June and end late September to early October.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hemlocks-corylus">Hemlocks</a></span> usually only produce low counts but some years moderate counts can occur. The season varies a great deal from year to year due to the effect of weather and cyclical patterns. The season can start from mid-May to early June and end late May to mid-June.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maple</a></span> season can start from early to late April and end the third week of May to mid-June. Mostly low and moderate counts are observed with the occasional high obtained.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4">The counts for <a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica"><span class="s1">nettles</span></a> are always low but they are important allergens due to their small size. The season can start from early to mid-July and end early to mid-September.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#oak-quercus">Oak</a></span> season can start from the third week of April to the second week of May and end from the first to the third week of June. High counts are observed and some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae">Pine, spruces and firs</a></span> season can start from the third week of April to the third week of May and end early lo late July. Very high counts are observed at this site. Significant allergens for individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#plantains-plantago">Plantains</a></span> produce only low counts. The season can start from the third week of June to early July and end from the first to the third week of September. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar and aspen</a></span> can have a low early season in March. The main season can start from the first to the third week of April and end early to late May. Mostly low and moderate counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a></span> counts are always low at this site but may be high enough to cause allergic reaction to individuals who are highly sensitized. The season can begin late July to early August and end late September. Ragweed population varies a great deal throughout this Province.</p>
<p class="p1"><strong>Predominant Spores for the Halifax, Nova Scotia region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Moderate counts of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Alternaria"><span class="s1">alternaria</span></a> are observed in August and September. May play a significant role in allergies in highly sensitized individuals.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a></span> is found throughout the counting season but the highest counts are from July to well into late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4">Very high counts of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Boletus"><span class="s1">boletus</span></a> are observed. Season is from August to late October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4">Moderate and high of counts of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Botrytis"><span class="s1">botrytis</span></a> are observed from late May to mid-October. Could play a significant role in causing allergic reactions.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium">Cladosporium</a></span> is the most prominent spore for the whole season. The highest counts occur from late March to late fall. Could cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">The counts for <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Coprinus"><span class="s1">coprinus</span></a> are significant but not as high as <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma"><span class="s1">ganoderma</span></a> or <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium"><span class="s1">cladosporium</span></a>. The season is from August and well into October. Considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Diatrypaceae">Diatrypaceae</a></span> counts fluctuate throughout the whole counting season. The counts are particularly high in the spring and fall. Season continues well into October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Epicoccum">Epicoccum</a></span> does not reach really high numbers but may cause reactions in highly sensitized individuals. The main season is from approximately mid-June to late September.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a></span>, also know as powdery mildew, occurs from July and well into October.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4">Very sporadic counts of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Fusarium"><span class="s1">fusarium</span></a> are observed throughout the whole counting season. The season is from the end of March to mid-October.</p>
<p class="p3"><strong>Ganoderma sp</strong></p>
<p class="p4">Very high counts of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma"><span class="s1">ganoderma</span></a> are observed. The main season is mid-June to well into October. Considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4">Sporadic counts of <a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Helicomyces"><span class="s1">helicomyces</span></a> are found throughout the whole season but the highest counts are observed from the end of May to the end of September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a></span> is found throughout the counting season but the highest counts are from July to well into late fall.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Uredinales">Uredinales</a></span> or rusts are not found in very high numbers. The season is August to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales">Ustilaginales</a></span> also know as smuts occur mostly from June to mid-October.</p>`,
    },
    {
      id: 7,
      name: 'Ontario',
      html: `  <p style="font-weight: 400;"><strong>Predominant Pollen for the Thunder Bay, Ontario region</strong></p>
<p style="font-weight: 400;">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p style="font-weight: 400;"><strong>Alder (Alnus sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#alder-alnus">Alder</a>&nbsp;season, with significant counts, can start from late March to mid-April and end early to late June. The counts fluctuate from low to very high due to the number of species present and the effect of weather. Considered to be important allergens.</p>
<p style="font-weight: 400;"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p style="font-weight: 400;">This group of weeds are similar microscopically and are not differentiated. They include some weeds, which are considered allergenic. Mostly low with the occasional moderate counts are observed. The season can start from late June to the third week of July and end middle to late September. This group contains a few species that are considered allergenic.</p>
<p style="font-weight: 400;"><strong>Ash (Fraxinus sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ash-fraxinus">Ash</a>&nbsp;pollination season lasts between two to four weeks. The season can start from the third week of April to mid-May and end mid-May to the second week of June. The season fluctuates a great deal from year to year and the counts can range from low to high depending on the weather. Considered to be allergenic only in highly sensitized individuals.</p>
<p style="font-weight: 400;"><strong>Birch (Betula sp.)</strong></p>
<p style="font-weight: 400;">The start and end of the&nbsp;<a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#birch-betula">birch</a>&nbsp;season can fluctuate a great deal due to the effect of weather. The season can start late April to mid-May and end late May to late June. The counts can be very high and can play an important role in allergic reactions.</p>
<p style="font-weight: 400;"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#cedar-pinaceae">Cedars, junipers and yews</a>&nbsp;produce low to very high counts. The season can start from mid to late March and end early to mid-June. May only be of significance in individuals who are highly sensitized. (Most species in Canada do not cause allergic reactions).</p>
<p style="font-weight: 400;"><strong>Elm (Ulmus sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#elm-ulmaceae">Elms</a>&nbsp;can have a short early season from mid-March to early April. The main season can occur from the second week of April to early May and end early to mid-May. The season varies a great deal from year to year not only on when it occurs but also on how much pollen is released in the atmosphere. Counts vary from very low to some years obtaining moderate counts. They could play a role in causing allergic reactions in individuals who are highly sensitized.</p>
<p style="font-weight: 400;"><strong>Grasses (Gramineae family)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#grasses-poaceae">Grasses</a>&nbsp;produce moderate and high counts in June and July. The season can start the second week of May to early June and end early October.</p>
<p style="font-weight: 400;"><strong>Hazel (Corylus sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#hazel-corylus">Hazelnuts</a>&nbsp;have a season lasting approximately two to three weeks and occasional moderate and high counts are observed. The season can start from early April to almost the end of April and end early May to about mid-May.</p>
<p style="font-weight: 400;"><strong>Larch (Larix sp.)</strong></p>
<p style="font-weight: 400;">The season for the larch and tamaracks can vary a gret deal from year to year. Some years hardly any pollen is produced, yet other years moderate counts can be obtained. The season can start from mid-April to early May and end early to late May.</p>
<p style="font-weight: 400;"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#maple-acer">Maples</a>&nbsp;can have a shorter early season with low counts which can occur late March to early April. The main season can start from mid-April to early May and end mid-May to early June. Seasons vary in duration, timing and pollen levels from year to year mostly due to the effects of weather. Some species are known to cause allergic reactions.</p>
<p style="font-weight: 400;"><strong>Mugwort (Artemisia sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#mugwort-artemisia">Mugwort</a>&nbsp;season is from late July to early October with only low counts observed. Could be considered an important allergen in highly sensitized individuals.</p>
<p style="font-weight: 400;"><strong>Nettles (Urticaceae sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#nettle-urtica">Nettles</a>&nbsp;and parietaria season can start from mid-June to early July and end early to late September. The counts are mostly in the low range. They play an important role in causing allergic reactions in highly sensitized individuals, especially due to their small size.</p>
<p style="font-weight: 400;"><strong>Oak (Quercus sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#oak-quercus">Oak</a>&nbsp;season can start from late April to late May. The season can end the third week of May to mid-June. The seasons can vary a lot from year to year. Some species are considered allergenic.</p>
<p style="font-weight: 400;"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p style="font-weight: 400;">Very high counts are observed for&nbsp;<a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#pine-pinaceae">pine, fir and spruce</a>&nbsp;and the season can start from early to late May and end early to late July. This group can be very important to those who have allergic sensitivities.</p>
<p style="font-weight: 400;"><strong>Plantains (Plantago sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#plantains-plantago">Plantains</a>&nbsp;pollinate from July to the end of September with mostly low and occassional moderate counts. They may cause allergic reactions in highly sensitized individuals even at low levels.</p>
<p style="font-weight: 400;"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#poplar-populus">Poplar, cottonwood and aspen</a>&nbsp;season can start from early April to the fourth week of April and can end early to late May. Some of the counts can get very high and may cause allergic reactions.</p>
<p style="font-weight: 400;"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#ragweed-ambrosia">Ragweed</a>&nbsp;pollen is observed from late July to mid-October. Some moderate and occasional high counts are observed from the third week of August to mid-September. The end of the season occurs with a hard frost.</p>
<p style="font-weight: 400;"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#sagebrush-artemisia">Sagebrush</a>&nbsp;season is from late July to early October with only low counts observed. Could be considered an important allergen in highly sensitized individuals.</p>
<p style="font-weight: 400;"><strong>Willow (Salix sp.)</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/allergies/types-of-pollen/#willow-salix">Willow</a>&nbsp;season varies a great deal from year to year. The season can start from mid-April to mid-May and end late May to mid-June.</p>
<p style="font-weight: 400;"><strong>Predominant Spores for the Thunder Bay, Ontario region</strong></p>
<p style="font-weight: 400;">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p style="font-weight: 400;">Note: This site is unique because during the late summer months (July to September) the predominant group of spores include the Basidiomycota. This group consists of many fungal spores and some are known to be highly allergenic.</p>
<p style="font-weight: 400;"><strong>Alternaria sp.</strong></p>
<p style="font-weight: 400;">High counts of&nbsp;<a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Alternaria">Alternaria</a>&nbsp;are observed and certain species are known to cause allergic reactions. The season with significant counts is from May to mid-October.</p>
<p style="font-weight: 400;"><strong>Aspergillus sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Aspergillus">Aspergillus</a>&nbsp;spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from March to well into October.</p>
<p style="font-weight: 400;"><strong>Boletus sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Boletus">Boletus</a>&nbsp;counts for this spore do get very high and may be significant in causing allergic reactions. The season is mid-June to mid-October.</p>
<p style="font-weight: 400;"><strong>Botrytis sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Botrytis">Botrytis</a>&nbsp;may be a significant allergen and the counts do get very high. The season is from May to early October with moderate and some high counts.</p>
<p style="font-weight: 400;"><strong>Caloplaca sp.</strong></p>
<p style="font-weight: 400;">Sporadic counts of Caloplaca are observed from March to mid-October. The allergenicity of this fungal spore is not well understood.</p>
<p style="font-weight: 400;"><strong>Cladosporium sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Cladosporium">Cladosporium</a>&nbsp;spore is found throughout the whole season and exists all year round. Very high counts are known to occur from late March to well into October.</p>
<p style="font-weight: 400;"><strong>Coprinus sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Coprinus">Coprinus</a>&nbsp;mushroom can produce some very high counts from May through to mid-October. It is considered an important allergen.</p>
<p style="font-weight: 400;"><strong>Diatrypaceae sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Diatrypaceae">Diatrypaceae</a>&nbsp;counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October. No known allergic properties.</p>
<p style="font-weight: 400;"><strong>Epicoccum sp.</strong></p>
<p style="font-weight: 400;">Some species of&nbsp;<a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Epicoccum">Epicoccum</a>&nbsp;are known to cause allergic reactions. The main season is from May to mid-October with low to moderate counts.</p>
<p style="font-weight: 400;"><strong>Erysiphe (Oospora) sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Erysiphe">Erysiphe</a>, also known as Powdery mildew, season is from mid-April to mid-October. Very high counts are observed. Allergenic properties are unkown.</p>
<p style="font-weight: 400;"><strong>Fusarium sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Fusarium">Fusarium</a>&nbsp;counts are very sporadic from April to mid-October. Some high counts are observed.</p>
<p style="font-weight: 400;"><strong>Ganoderma sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ganoderma">Ganoderma</a>&nbsp;or bracket fungus can produce very high counts from mid-June to mid-October. It is considered an important allergen.</p>
<p style="font-weight: 400;"><strong>Helicomyces sp.</strong></p>
<p style="font-weight: 400;">The main season for&nbsp;<a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Helicomyces">Helicomyces</a>&nbsp;is very sporadic from May to the end of September producing moderate and very high counts.</p>
<p style="font-weight: 400;"><strong>Leptosphaeria sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Leptosphaeria">Leptosphaeria</a>&nbsp;season, with significant counts, is May to early October, with great fluctuations in counts from day to day, which is probably due to the effect of weather. Very high counts are observed from May to early October.</p>
<p style="font-weight: 400;"><strong>Myxomycetes</strong></p>
<p style="font-weight: 400;">Moderate and high counts of Myxomycetes are observed from April to mid-October.</p>
<p style="font-weight: 400;"><strong>Penicillium sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Penicillium">Penicillium</a>&nbsp;spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from March to well into October.</p>
<p style="font-weight: 400;"><strong>Pithomyces sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Pithomyces">Pithomyces</a>&nbsp;is mostly in the low to moderate range from mid-June to mid-October.</p>
<p style="font-weight: 400;"><strong>Polythrincium sp.</strong></p>
<p style="font-weight: 400;">Polythrincium season is from mid-June to the end of September with low to high counts observed. The allergenicity of this fungal spore is not well understood.</p>
<p style="font-weight: 400;"><strong>Uredinales sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Uredinales">Uredinales</a>&nbsp;or rusts do sometimes occur in really high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from the end of May to mid-October.</p>
<p style="font-weight: 400;"><strong>Ustilaginales sp.</strong></p>
<p style="font-weight: 400;"><a href="http://www.pollenexperts.ca/types-fungal-mold-spores/#Ustilaginales">Ustilaginales</a>&nbsp;a.k.a smuts can reach high counts, allergenicity is unknown. The season with significant counts is mid-May to mid-October with some high counts.</p>
<p style="font-weight: 400;"><strong>Venturia sp.</strong></p>
<p style="font-weight: 400;">Venturia&nbsp;spore is very abundant at this site and the season is sporadic producing some very high counts from mid-May to mid-October. Allergenic properties are not well understood but it is mostly associated with apple scab.</p>


<p class="p1"><strong>Predominant Pollen in the Saskatoon, Saskatchewan region</strong></p>
<p class="p2">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season ranges from late March to late June and the counts vary from low to moderate due to the number of species present.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">These groups of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Counts are mostly in the low to moderate ranges and the occasional high count, from mid-June to early October.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollination season can begin from late April to early May and can end mid-May to early June. The season can last at least three weeks and low to high counts are observed. Considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season varies a great deal from year to year due to the effect of weather. The start of the season can occur from late April to mid-May and end from the late May to late June. High counts are observed and they are considered significant allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> can produce significant counts (from low to high counts) from mid-March to late July. May not be of significance in causing allergic reactions except in highly sensitized individuals.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. Low, moderate and high counts are observed. The season can last from two to four weeks depending on the year. The pollen season can start from early April to early May and can end from early to late May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce significant counts, usually in the moderate range, in June and July. The season can start from mid-May to early June and ends early October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> produce mostly low, with the occasional moderate, counts. The season can start from early April to early May and end late April to early May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Linden &amp; Basswood (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Linden and basswood</span> season varies from year to year. The season can start from early to mid-July and end late July to early August. Some years hardly any pollen is produced whereas other years low and moderate counts are observed. May cause allergic reactions to those who are highly sensitized.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies from year to year due to the the effect of weather. Significant counts are observed during the season which can start mid-April to early May and end late May to late June. The season lasts approximately one month. There is also a short season in early June but this species is insect pollinated and very little pollen gets airborne.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugwort</span> season is from mid-July to mid-October. Low to moderate counts, and the occasional high counts, are observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles </span>and parietaria occur in significant numbers that may cause allergic reactions and are consdered important allergens. The season start is mid-June to early July and the season end is early September. The counts are in the low to moderate ranges.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from the third week of April to the thrid week of May and end late May to mid-June. The season is highly affected by weather. Mostly low, with the occasional moderate or high, counts observed. Oaks, depending on the species, are highly allergenic.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from early April to late April and the end of the season can be from early May to the end of May. Because of the extreme temperatures and weather conditions the season start and finish dates can vary by as much as a month. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">High counts are observed for <span class="s1">pine, fir and spruce</span>. The season can start from early to late May and can end early to late July. The season varies a great deal from year to year due to the effect of weather. This is a very important group for those who are sensitised.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season is from late July to early October. Most of the counts are low but the occasional moderate one is observed. Even at these levels ragweed can be significant in causing allergic reactions.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4">The main <span class="s1">sagebrush</span> season is from mid-July to mid-October. Low to moderate counts, and the occasional high counts, are observed.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4">The season for <span class="s1">willows</span> can start from mid-April to mid-May and end late May to mid-June. There is a great variation in the season from year to year due to weather. Not only the timing of the pollen season can vary but as well the pollen levels. Some years only low counts are observed and other years very high counts are obtained. Considered to be allergenic in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Spores in the Saskatoon, Saskatchewan region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from April to mid-October. The highest counts are observed from July to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season is very sporadic with some high counts observed. It may be of significance in causing allergic reactions. The season is from mid-June to end of September.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen and high counts are observed. The season is from mid-May to the end of September.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is from June to the end of September. The counts are sporadic and in the low to high ranges. Allergenic properties are unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round and very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some very high counts in July and August. The season is from mid-May to the end of September with significant counts. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from late March to mid-October. Not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are in the low to moderate range. This is a summer and fall spore, July to September. There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from the end of April to mid-October with low to high counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from April to mid-October. Low to high counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to the end of September with mostly low to moderate counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> also know as bracket fungus can produce high counts from June to the end of September. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September, producing moderate and high counts. The season is sporadic. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is from late March to early October. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from late May to mid-October.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate and low counts are observed from April to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range, with some high counts observed, from late May to the end of September. Allergenic properties are unknown.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season occurs mostly from August to the end of September with moderate counts observed.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also referred to as rusts do occur in high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from mid-May to early October and the counts are mostly low to moderate with some in the high range.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">The allergenic properties of <span class="s1">ustilaginales</span> a.k.a smuts are unknown. The season is from mid-May to mid-October with some very high counts.</p>
<p class="p1"><strong>Predominant Pollen in the Regina, Saskatchewan region</strong></p>
<p class="p6">Due to variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season starts from early to late April and ends late June. The counts are in the low to moderate range and may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">These groups of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Counts are in the low to moderate ranges, and the season can start early to mid-June and end early October.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can start the second week of April to the second week of April to the second week of May and end the third week of May to early June. Very high counts are observed. Can cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season varies slightly from year to year due to the effect of weather. The season can start from the third week of April to the first week of May and end late May to late June. The amount of pollen observed varies from year to year. Low and moderate counts are observed depending on the year.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> can produce significant counts, from low to high. The season can start the end of March to the third week of April and end early to late June. Most species in Canada are not considered to be significant in causing allergic reactions.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> can be important allergens. Low to high counts are observed and the season can last three to four weeks. The pollen season can start mid-April to early May and end early to late May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season starts from the second week of May to early June and ends late September to early October. Low, moderate and occasional high counts are observed.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies from year to year due to the the effect of weather. A small early season with sporadic counts can occur from mid-April to early May. The main season, which can be more stable, can start from late April to the second week of May and end the third week of May to early June. The counts do get very high and some species are known to cause allergic reactions. The season lasts approximately one month.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugwort</span> season starts from early to mid-July and ends well into October. Low to moderate counts are observed. They may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria produce mostly low, with the occasional moderate, counts and the season can start from the second to the third week of June and end early September. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from the third week of April to the third week of May and end late May to late June. The season is highly affected by weather. Mostly low, with the occasional moderate or high, counts are observed. Oaks, depending on the species, are allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">The season for <span class="s1">spruce, fir and pine trees</span> can start from the first to the third week of May and end early to late July. Mostly low to moderate, with occational high, counts are observed. The season varies a great deal from year to year due to the effect of weather. This group is very important for those who are sensitised.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> counts are always low but even at these levels allergic reactions can occur in highly sensitized individuals. The season starts from late May to early June and ends late August.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start late March to the third week of April and end the second week of May to early June. Because of the effect of weather, the season can vary by approximately three weeks. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can start from late June to early August and end in October with a heavy frost. Occasional moderate counts are observed.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrush</span> season starts from early to mid-July and ends well into October. Low to moderate counts are observed. They may cause allergic reactions in highly sensitised individuals.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4">The season for <span class="s1">willows</span> can start from mid-April to early May and end between late May to mid-June. There is a great variation in the season from year to year due to weather, and low to moderate counts are observed. Considered to be allergenic in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Spores in the Regina, Saskatchewan region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from April to mid-October. The highest counts occur from July to early October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season for this spore is very sporadic with the occasional moderate counts observed. It may not be of significance in causing allergic reactions at these levels. The season, with moderate counts, is mostly in August.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen and high counts are observed. The season is from mid-May to the end of September.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is from June to the end of September. The counts are sporadic and in the low to high ranges. Allergenic properties are unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round and very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some high counts from June to August. The season is from late May to early October, with significant counts. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae sp.</span> counts are sporadic throughout the whole counting season. High counts can be observed from April to early October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts for drechslera are in the low to moderate range. This is a summer and fall spore (July to September). There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from the end of April to mid-October with low to high counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, season is from April to mid-October. Low to high counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to the end of September with mostly low to moderate counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span>, also known as bracket fungus, can produce moderate counts from July to early October. It is considered an important allergen.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> season is from May to the end of September, producing moderate and high counts. The season is sporadic. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">The season for <span class="s1">Leptosphaeria</span> is from late March to early October. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from late May to mid-October.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate and low counts are observed from April to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range, with some high counts observed, from late May to the end of September. Allergenic properties are unknown.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season occurs mostly from August to the end of September with moderate counts observed.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p7"><span class="s1">Uredinales</span>, also know as rusts, do occur in high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from July to early October and the counts are mostly low to moderate with some in the high range.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">Allergenic properties of <span class="s1">ustilaginales</span> a.k.a smuts are unknown. The season is from late May to early October with some very high counts.</p>
<p class="p1"><strong>Predominant Pollen in the Prince Albert, Saskatchewan region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from late March to mid-Apri and end mid to late June. The counts vary mostly from low to moderate with the occasional high. The alder season is highly sensitive to weather conditions. The highest counts occur from april to mid-June. They are usually considered important allergens.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">This group of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Low and moderate counts are observed from mid-June to late September.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can start from late April to mid-May and end late May to early June. Some years very high counts are observed but the season varies from year to yearin timing, season length and pollen levels. This is partially due to weather. Considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">The start and end of the <span class="s1">birch</span> season can vary by as much as a month which is due to the effect of weather. The start of the season can occur from late April to mid-May and the end can occur from late May to late June. The counts can get in the high range.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> produce significant counts, mostly in the moderate range, with a few high counts. The season can start late March to mid-April and end late May to mid-June. Some high counts are observed. There is great fluctuation in the season due to the effect of weather. Probably of no significance in causing allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. The season can start from early April to early May and end late April to late May. There is a large fluctuation from year to year for the season length, timing of the season and the amount of pollen produced. This is partially due to the effect of weather.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce significant counts, usually in the low and moderate ranges with the occasional high counts in June and July. The main season can start from mid to late May and end early to mid-October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> produce low and moderate counts. The season can start from the second week of April to the second week of May and end mid to late May. The counts can be in the low to moderate range. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies greatly which is mostly due to the effect of weather. Not only does the season start and end vary but the amount of pollen produced as well as the season length. The season can start from late April to mid-May and end mid to the end of May. Most years the counts are low and moderate. Occasionally a high count is observed.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugwort</span> season is from mid-July to mid-October with low and moderate counts observed. Certain species are considered highly allergenic.</p>
<p class="p3"><strong>Mustard &amp; Cabbage</strong></p>
<p class="p4">The mustard and cabbage family are responsible for contact dermatitis and food allergies. They are not considered important in airborne allergies since they are mostly insect pollinated but a significant amount of pollen is observed in our samples at this location. The season can start around late June and lasts until mid-September. Mostly low, with the occasional moderate, counts are observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria occur in significant numbers that may cause allergic reactions. The season is from mid-June to early September and the counts are in the low and moderate ranges.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from late April to the third week of May and end early to mid-June. Mostly low, with the occasional moderate, counts are observed. The timing of the season as well as to how much pollen is produced can vary a lot from year to year partially due to the effect of weather. Oaks are highly allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Very high counts are observed for <span class="s1">pine, fir and spruce</span>. The season can start early May to the third week of May and end mid to late July. There can almost be a month difference as to when the season can occur from year to year which is partially due to weather. This group is very important to those individuals who are sensitized.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from early April to the end of April and end from early to late May. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season is from late July to early October with only low counts observed.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrush</span> season is from mid-July to mid-October with low and moderate counts observed. Certain species are considered highly allergenic.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> pollen season can start from mid-April to early May and end early to late June. There is a great variation in the season from year to year not only in when the season occurs but the amount of pollen produced. Some years very high counts are observed. Considered to cause allergic reactions in individuals who are sensitized.</p>
<p class="p1"><strong>Predominant Spores in the Prince Albert, Saskatchewan region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from May to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> are found throughout the whole counting season and are probably present in significant numbers beyond that. Significant counts are observed from late March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts are sometimes very sporadic with some high counts observed. It may be of significance in causing allergic reactions. The season is from mid-June to the end of September.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen, and high counts are observed. The season is sporadic from late April to early October.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is sporadic from late March to early October. Allergenic properties are unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus sp.</span> can produce some very high counts from late May to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. Very high counts can be observed from late March to mid-October. Not known to cause allergic reactions</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are mostly in the low range. This is a late summer and fall spore, July to early October. There are other related genera, which are also found in air samples that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4"><span class="s1">Epicoccum</span> species are known to cause allergic reactions. The season is from the end of April to mid-October with low and moderate counts observed.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, main season is from late April to mid-October. Low to high counts are observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to the end of September with low and moderate counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> also known as bracket fungus can produce high counts from mid-June to early October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing low to very high counts. The season is very sporadic. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season starts early April and ends mid-October. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from July to mid-October. This group is important for those individuals who are sensitized.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Low and moderate counts are observed from late March to mid-October. Some moderate and high counts are observed.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> are found throughout the whole counting season and are probably present in significant numbers beyond that. Significant counts are observed from late March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season produces low to moderate counts, with a few high counts observed, from mid-June to the end of September. Allergenic properties are unknown.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season occurs mostly from July to the end of September with occasional moderate counts observed.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> aka rusts do occur in high numbers but not enough is known about their significance in causing allergic reactions. The main season is from late May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> commonly referred to as smuts can reach high counts, but allergenic properties are unknown. The season is from mid-April to mid-October with some very high counts.</p>
<p class="p8">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->



<p class="p1"><strong>Predominant Pollen for the London, Ontario region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><span class="s1">&nbsp;</span><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s2">Alder</span> season can start from mid to late March and end late June. The counts fluctuate from low to moderate with an occasional high possible. The season is highly affected by the weather. They can be considered important allergens at these levesl.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s2">Ash</span> pollen season lasts well over a month. The season can start early to almost the end of April and end mid-May to early June. Some very high counts are observed and they are considered to be allergenic in highly sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s2">Beech</span> season varies from year to year. Some years we get only sporadic and low counts and other years the season can last well over a month with low and moderate counts. This fluctuation is due to natural cycles and weather. The season can start from mid-April to early May and end mid-May to early June. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s2">Birch</span> season can start from the first to the last week of April and end mid-May to early June. The timing of the season varies from year to year as well as the amount of pollen produced. The pollen lavels can reach moderae or high levels depending on the year. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s2">Cedars, junipers, and yews</span> produce low to high counts and the season varies a great deal from year to year. The season can start from early to late March and end late May to mid-June</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s2">Chestnuts</span> are important allergens and the season lasts from two to five weeks depending on the weather. The season can start from early to late May and end mid to late June. The Horse Chestnut, which is the most allergenic, is found in low to moderate numbers for approximately one to two weeks. The season can occur from mid-May to mid-June.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s2">Elm</span> are considered important allergens. The season can start early to mid-March and some years early April. The season end is from late April to early May. The timing of the season and the amount of pollen produced each year varies a great deal and this is partly due to the effect of weather. Mostly low to moderate counts are obtained. High counts can be observed some years.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s2">Grass</span> season is from late April to October. Moderate and high counts are observed from May to late July.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s2">Hickories</span> have a short season which usually occurs late April and only has low counts. The main season can start early to the third week of May and end mid to late June. The pollen levels can vary from year to year and moderate counts can be observed. The season can last well over a month.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s2">Maples</span> have an early season that can occur from about the second to third week of March. The season&rsquo;s can be highly effected by weather. In warm years like 2012 the season can start earlier. The main season can start from mid-March to the end of March and end mid to late May. Low to high counts are observed. Certain species are known to cause allergic reactions.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s2">Mulberries</span> produce very high counts at this site. The pollen season lasts approximately six weeks due to the many species present at this site. The season can start mid-April to early May and end early to late June. They are considered important allergens in high numbers.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s2">Nettles</span> and parietaria pollinate from late May to late September and moderate counts are observed from mid-July and into August. They are considered important allergen partly due to their small size and ability to get into the lungs.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s2">Oaks</span> have several flowering periods which is due to the many species present. The seasons are affected by weather conditions. The season can start from the first to the third week of April and end late May to almost mid-June. The counts can get very high. Some of the species are considered highly allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">This includes the <span class="s2">spruce, fir and pine trees</span>. Some high counts are observed and the season can vary by as much as a month. The season can start from mid-April to early May and end early to late July.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s2">Plantains</span> pollinate from June to early October. The counts are generally in the low range and occasionally moderate. This may cause allergic reaction in highly sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s2">Poplars, cottonwoods and aspens</span> can have a very short season mid-March. The main season can last almost two months and can start late Marh to early April and end early to late May. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s2">Ragweed</span> pollen can be observed from early July. The main season usually starts late July and ends well into October when a heavy frost occurs. Moderate and high counts are obtained from the first week of August to early October. They are considered important allergens.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4"><span class="s2">Walnut</span>s are considered important in causing allergic reactions. The pollen season can start from early May to mid-May and can end late May to late June. Very high counts are observed at this site.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4">Pollen season lasts well over a month for <span class="s2">Willow trees</span>. The season can start the third week of March to the third week of April and end mid to late May. Pollen levels can vary from year to year. Most years low and some moderate counts are observed. Other years the occasional high count is obtained. They can cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p1"><strong>Predominant Fungal Spores (Mold) for the London, Ontario region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Some high counts of <span class="s2">alternaria</span> are observed and certain species are known to cause allergic reactions. The season is from May to the end of September.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s2">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from July to well into October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s2">Boletus</span> counts for this spore do get high and may be significant in causing allergic reactions. The season is July to mid-October.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s2">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from May to late October.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s2">Coprinus</span> mushroom can produce some very high counts from May to late October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s2">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October.They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s2">epicoccum</span> are known to cause allergic reactions. The season is from June to mid-October with some high counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s2">Erysiphe</span>, also know as powdery mildew, season is from May to mid-October. Mostly moderate counts are observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s2">Fusarium</span> counts are very sporadic from June to mid-October. Majority of highest counts are observed in late summer and fall.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s2">Ganoderma</span> or bracket fungus can produce very high counts from July to mid-October. During the months of May and June the counts are moderate to high. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s2">Helicomyces</span> season is from May to the end of September producing moderate and very high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">The season for <span class="s2">leptosphaeria</span> is May to early October with fluctuations in counts from day to day which is probably due to the effect of weather. Highest counts are observed from June to the end of September.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from June to late September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s2">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from July to well into October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate counts of <span class="s2">pithomyces</span> are observed late July to early October.</p>
<p class="p3"><strong>Torula sp.</strong></p>
<p class="p4">Moderate counts are observed for <span class="s2">Torula</span> in September and October.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s2">Uredinales</span> or rusts do not occur in really high numbers and allergenic properties are not well understood. The season is from June to late October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s2">Ustilaginales</span> also know as smuts can reach high counts, allergenicity is unknown. The season is May to mid-October. Very high counts are observed in September and October.</p>
<p class="p6">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->


<p class="p1"><strong>Predominant Pollen for the Sudbury, Ontario region</strong></p>
<p class="p2">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from the third week of March to the second week of April and can end from mid-June to early July. The amount of pollen varies from year to year as well as the timing of the season. Low, moderate and high counts can be observed. The alder are considered significant allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season lasts almost four weeks and can start mid to late April and end mid-May to early June. Moderate and high counts are observed. Considered to be allergenic in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from mid-April to early May and can end the third week of May to the third week of June. Some very high counts are observed and they are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> produce high counts and the season can start from mid-March to eary April and end late May to mid-June. Most of the species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> season can start between early to late April and end late April to second week of May. Low to high counts are observed. The season varies depending on where the sampling site is located. The elms are considered important allergens.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce significant counts in June and July. The season can start with low counts early to mid-May and ends late September. Most of the counts are in the low to moderate range with occational high counts. The pollen levels vary from year to year.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> have a season lasting from one to two weeks. Mostly low counts with the occasional moderate counts possible. The season can start mid-March to early May and end from the third week of April to mid-May. Can cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlocks</span> can produce low and the occasional moderate counts. The season can start between mid to late May and end the third week of May to the third week of June. The season can change from year to year and lasts from one to two weeks. Some years the counts are very sporadic and very low, whereas other years the season can have low and moderate counts. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> has two distinct seasons: a short early season that may occur from mid-March to early April and the main season, that can start early April to the third week of April and end mid to late May. The season lasting well over one month. The counts can get very high and some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4">Mugwort season can start from the third week of July to early August and end late September to early October with low counts observed. Could be considered an important allergen in highly sensitized individuals.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s1">Mulberry</span> season can be sporadic and can last almost one month. This is due to the different species present. The pollen season can start from mid-April to early May and ends mid to late May. The counts are in the low with occasional moderate counts and they may cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria produce low and some moderate counts and the season is from the third week of June to mid-September. The counts are mostly in the low range with the occasional moderate count observed. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start mid-April to early May and end late May to early June. The season fluctuates in timing and the amount of pollen produced and this is mostly due to weather. The counts can reach high levels and some species can cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">The season for <span class="s1">spruce, fir and pine trees</span> can start late April to early May and can end early to late July. Very high counts are observed during the season. This is an important group for those individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> are important allergens for highly sensitized individuals, even at low levels. The season occurs from around mid-June to mid-September.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4">The main season for the <span class="s1">poplars, cottonwood and aspen</span> can start early to mid-April and end early to late May. A short early season with low counts is possible late March to early April. The main season can last well over one month. Some of the counts are high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> pollen is observed from late July to mid-October with moderate counts occurring mid-August to the third week of September. They are considered important allergens.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrush</span> season can start from the third week of July to early August and end late September to early October with low counts observed. Could be considered an important allergen in highly sensitized individuals.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season varies a great deal and can last from three to four weeks. The season can start from mid-April to the beginning of May and end mid-May to early June. Mostly low, with the occasional moderate, counts are observed. Could cause allergic reactions in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Fungal Spores (Mold) for the Sudbury, Ontario region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">High counts of <span class="s1">Alternaria</span> are observed and certain species are known to cause allergic reactions. The season is from May to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from May to mid-October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts for this spore get very high and may be of significance in causing allergic reactions. The season is June to mid-October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen. The season is from mid-June to mid-September with low to high counts.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round and high counts are known to occur from late May to well into October.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some high counts from May to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October. Not know to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season with significant counts is from June to early October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as Powdery mildew, season with the highest counts is from May to late September. Moderate and high counts are observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are sporadic from May to early October. Some high counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing moderate and very high counts.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season, with moderate and high counts, is from May to mid-October with great fluctuations in counts from day to day. This is probably due to the effect of weather.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from late April to late September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from May to mid-October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate ranges from July to the end of September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> or rusts do not occur in really high numbers and not enough is known about their significance in causing allergic reactions at these levels. The season, with significant counts, is from mid-May to the end of September.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> also know as smuts can reach high counts but allergenicity is unknown. The season is May to mid-October with some high counts.</p>
<p class="p6">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->


<p class="p1"><strong>Predominant Pollen in the Hamilton, Ontario region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from early March to early April and end late May to mid-June. There are fluctuations in the counts from low to moderate (Some years an occasional high count is possible). The season is highly affected by weather. At these levels they can cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season lasts well over four weeks. The season can start from about mid to late April and end late May. Some low to high counts are observed and they are considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season varies a great deal from year to year. Some years the season lasts well over month, while other years hardly any counts are observed. This is partly due to weather, but also caused by the natural cycles for these trees. The counts are mostly low with the occasional moderate count possible in some years.</p>
<p class="p4">The season can start the third week of April to the first week of May and end mid to late May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from the second to the last week of April and end late May to early June with counts ranging from low to high. The counts do get very high and they are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> produce low to high counts and the season varies a great deal from year to year. The season can occur from late February to late June. The counts do get very high. Most species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4">The season for the <span class="s1">chestnuts</span> can start mid to late May and end mid to late June. Mostly low with the occasional moderate counts are observed.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elms</span> are considered important allergens. The season can start from early to mid-Marh and ends around early May. The whole season can last almost two months. Some high counts are observed.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season can start as early as late April and end early October. Low to high counts are observed from the end of May to late July.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlocks</span> have very different seasons from year to year. This is due to weather and probably natural cycles. The season usually only produces low counts but moderate counts are possible. The season can start early to mid-May and ends late May to mid-June.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s1">Hickories</span> have a short early season, lasting approximately one week from late April to early May. The main season can last almost a month and can start from mid to late May and end mid to late June. Most of the counts are low but some years an occational moderate count is possible.</p>
<p class="p3"><strong>Linden, Basswood, Lime Trees (Tilia sp.)</strong></p>
<p class="p4">The <span class="s1">linden and basswood</span> season can start mid-June to early July and end mid to late July. Most years the counts are in the low range, but an occational moderate count can occur. They may not be of any significance at these levels.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season can start from early to the third week of March and end between mid to late May. Moderate and high counts are observed. Certain species are known to cause allergic reactions.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s1">Mulberries</span> produce very high counts at this site due to the number of species present. The pollen season can last approximately two months. The season starts from mid to late April and ends early to mid-June. Can be a significant allergen for those individuals who are sensitized.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria pollinate from June to late September and low to moderate counts are observed from mid-July to late August. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oaks</span> have several flowering periods due to the number of species present. The season can start the second to last week of April and ends the first to second week of June. Some of the counts are very high. The season is affected by weather as to when it starts and the amount of pollen released. Some of the species are considered allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Some high counts are observed for <span class="s1">spruce, fir and pine trees</span> and the occurrence of the pollen season can vary from year to year. The season can start from the second week of April to the first week of May and can end early to mid-July. Significant allergens for individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> pollinate from June to early October. The counts are generally in the low range and occasionally moderate. They may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from late March to early April and end the second to third week of May. The season can last almost six weeks and high counts are observed. At these levels they can cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> pollen is observed from late July to late October. Moderate to high counts are obtained in August and September.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4"><span class="s1">Walnuts</span> are considered important in causing allergic reactions. The pollen season can start early May to mid-May and can end the third week of June. The counts can get very high at this site.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> pollen season lasts for more than one month and can start from early to mid April and end mid to late May. The counts are usually low to moderate, but occasionally a high count is observed. They are considered to be allergenic only in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Fungal Spores (Mold) for Hamilton, Ontario region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Some high counts of <span class="s1">alternaria</span> are observed and certain species are known to cause allergic reactions. The season is from mid-April to the end of October with the highest counts occuring from June to October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from June to well into October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4">Counts for <span class="s1">Boletus</span> mushroom do get high and may be significant in causing allergic reactions. The season is July to mid-October.counts for</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but the highest counts occur from May to late October. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some very high counts from May to late October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from May to late October with some low to high counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4">Erysiphe, also known as powdery mildew, season is from April to mid-October. Low to high counts are observed. Allergenic properties are not well understood.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are sporadic throughout the whole counting season. The majority of the highest counts are observed from May to late September.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to late October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from April to mid-September producing moderate and very high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is May to early October with fluctuations in counts from day to day which is probably due to the effect of weather. Highest counts are observed from May to the end of September.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Few moderate counts of myxomycetes are observed from June to late September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from June to well into October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Few moderate counts of <span class="s1">pithomyces</span> are observed late July to early October.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Moderate counts of polythrincium are observed from mid-August to the end of September.</p>
<p class="p3"><strong>Torula sp.</strong></p>
<p class="p4">Moderate counts are observed for <span class="s1">torula</span> from July to September.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> or rusts do not occur in really high numbers and allergenic properties are not well understood. The season is from June to late October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> also know as smuts can reach high counts, and their allergenicity is unknown. The season is from May to late October. Very high counts are observed in September and October.</p>
<p class="p6">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->

<p class="p1"><strong>Predominant Pollen for Barrie, Ontario</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from the second week of March to the first week of April and end early to mid-June. The counts vary from low to high due to the number of species present and the effect of weather. The season with the highest counts can occur from late March to late April. The alder are considered important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can last more than a month. The season can start early in warm years, like 2012, but generally the season startsthe first to third week of April and ends the mid to the end of May. The counts do get very high and can cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from one year to the next. This is partly due to natural cycles and the effect of weather. The season can produce very few low counts to a season that can last well over a month and low to moderate counts are observed. The season can start late April to almost mid-May and end mid-May to early June. They may not cause reactions except in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">The main <span class="s1">birch</span> season lasts more than a month and can start from late April to early May and end mid-May to early June with very high counts observed. They are important allergens, especially at these levels.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> season can start from early to the third week of March. The season can end from the first to the third week of June. The counts can get very high. Most species in Canada do not cause allergic reactions.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s1">Chestnut</span> season varies from year to year in when the season happens and how much pollen is observed. This is partly due to natural cycles and the effect of weather. The season can start from early May to early June and end mid to late June. Mostly low with occasional moderate counts are observed. The amount of pollen observed varies according to the weather.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> season can start from the second week of March to early April and end late April to mid-May. The counts can get from the low to high range depending on the year and weather. At higher levels, this pollen can be allergenic.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season is from late April to almost mid-October. Significant counts in the moderate and high ranges are observed from mid-May to late July.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary a great deal from year to year due to the effect of weather and cyclical patterns. The counts can range from low to moderate, depending on the year. The season can start from the second to third week of May and end late May to mid-June. Can cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s1">Hickories</span> have a season that can vary a great deal from year to year and can last from two to more than three weeks. The counts can be in the low to moderate range depending on the year. The season can start from early to late May and end the second to third week of June. The variation in season is partly due to the effect of weather. They can be considered important allergens.</p>
<p class="p3"><strong>Linden, Basswood, Lime Trees (Tilia sp.)</strong></p>
<p class="p4">The season for the <span class="s1">linden and basswood</span> season can vary from year to year and is also dependent on where the sampling location is situated. The season can start late June to almost mid-July and end mid to late July. Low and moderate counts are possible.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4">The season for the <span class="s1">maple</span> can start from the second week of March to early April and end mid to late May. The counts can reach high levels but the season varies from year to year, not only in when it occurs but also the pollen levels observed. Some of the species are considered allergenic.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s1">Mulberries</span> can have a very long season that can last over a month. The season can vary somewhat depending on where the sampling location is situated. The counts can get very high and can cause allergic reactions. The season can start from mid-April to early May and end late May to mid-June.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria pollen season can start mid-May to mid-June and end late September. The counts are in the low and moderate ranges. They are considered important allergens because of their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from early to late April and end early to mid-June. The counts do get very high and some species are considered allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">The season for the <span class="s1">spruces, firs and pines</span> varies from year to year due to the effect of weather. The season can last almost three months and can start mid-April to mid-May and end early to late July. Very high counts are observed and can be important in causing allergic reactions in individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> can play an important role in causing allergic reactions. The season can start from early to mid-June and end mid-September to early October. The counts do get in the moderate range.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood, and aspen</span> season can start early March in warm years like 2012. Generally the season starts from early to mid-April and ends early to late May. The counts can get in the very high range. They can cause allergic reactions at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4">Main ragweed season starts from the third week of July to early August with rare counts possible before these dates. The season ends with a heavy frost, which is well into October. Moderate and high counts are obtained from the second week of August to early October. They are considered important allergens.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4">The pollen season for the walnuts is highly affected by weather. The season can last well over a month and can start early to late May and end second to last week of June. Most years only low to moderate counts are observed but there are others where the counts are very high and the season lasts well over a month and a half.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> can start from the second to the third week of April and end mid to late May. Low, with the occasional moderate, counts are observed. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p1"><strong>Predominant Spores for Barrie, Ontario</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Some high counts of <span class="s1">alternaria</span> are observed and certain species are known to cause allergic reactions. The season with high counts is from April to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from late March to well into October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts do get high from June to early October and may be significant in causing allergic reactions.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> is considered an important allergen. Moderate counts are observed from May to late September.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to late October.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some very high counts from May to mid-October. It is considered an important allergen. This fungus produces significantly higher counts at this site than at most other sampling locations.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. This fungus can produce very high counts from March to early October. They may not cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from April to late October with some high counts from July to mid-October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, season is from mid-April to mid-October. Some high counts are observed. Allergenic properties are not well understood.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic from March to the end of September. The majority of the highest counts are observed from June to late September.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to late October. During the month of May, the counts are moderate to high. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing moderate and high counts. The season is very sporadic. Allergenic properties are not well understood.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is April to mid-October with fluctuations in counts from day to day. This is probably due to the effect of weather. The highest counts are observed from June to the end of September. They can cause allergic reactions.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from March to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from late March to well into October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate and high counts of <span class="s1">pithomyces</span> are observed from mid-June to late September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also know as rusts do not occur in really high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from mid-May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> commonly referred to as smuts can reach high counts, but allergenicity is unknown. The season is May to late October.</p>
<p class="p5">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->


<p class="p1"><strong>Predominant Pollen for Brampton, Ontario</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from mid-March to early April and end from the first to the last week of June. The counts, most years, are in the low to moderate ranges. Some years high counts are possible. They are considered important allergens and, at these levels, can cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season can start from the first to the third week of April and end the third week of May to early June. High counts are observed, and they are considered to be allergenic in highly sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from year to year. This is due to a combination of the effect of weather and cyclical patterns. The season can start from mid-April to mid-May and end the third week of May to early June. The season can be sporadic but some years moderate counts are observed. They can cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from the second to the last week of April and end early to mid-June. Some very high counts are observed and they are considered important allergens. The birch look-a-likes&rsquo; season can vary a great deal from year to year. The counts can be only in the low range and some years the counts get high. The season is mostly in May and some species are considered allergenic.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> produce low to high counts. The season can start from early or mid-March to late March and end early to mid-June. Most species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s1">Chestnuts</span> are important allergens. The season varies from year to year with usually only low counts observed. Some years moderate counts are possible. The season can start from the second week of May to early June and end mid to late June.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. The season can start mid-March to mid-April and end late April to mid-June. The counts can reach high levels.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce moderate to high pollen counts from the third week of May to the third week of July. The season starts early to late May and ends late September to early October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnut</span> season can start the third week of March to early April and end the third week of April to early May. Mostly low counts are observed. At these levels they would only cause allegic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can start from early to late May and end late May to mid-June. The season can be sporadic and varies from year to year. The counts can be in the moderate range. May cause allergic reactions in individuals who are highly sensitized when shed in high numbers.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s1">Hickory</span> season can vary a great deal from year to year. This is partially due to the effect of weather and also to annual cycles. The season can start from late April to mid-May and end mid to late June. Some years moderate counts are observed. They could cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Linden, Basswood, Lime Trees (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Linden and basswood</span> season varies from year to year. The season can start from the third week of June to the first week of July and end mid to late July. Some years hardly and pollen is produced whereas other years low and moderate counts are observed. May cause allergic reactions in those individuals who are highly sensitized.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies due to the number of species present and the effect of weather. Significant counts, in the moderate and high range, can be observed from the last week of March to late May. The season can start from mid to late March and end mid-May to early June. Some species are considered allergenic.</p>
<p class="p5">&nbsp;</p>
<p class="p4"><span class="s2"><strong>Mulberry (Morus sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Mulberry</span> season can start from mid-April to early May and end early to mid-June. Low and moderate counts (rare high counts possible) are observed. They can cause allergic reactions at these levels.</p>
<p class="p4"><span class="s2"><strong>Nettles (Urticaceae sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Nettles</span> and parietaria occur in significant numbers that may cause allergic reactions. The season can start from mid-May to mid-June and end from the third to the last week of September. The counts can reach moderate levels. They are considered important allergens due to their small size.</p>
<p class="p4"><span class="s2"><strong>Oak (Quercus sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Oak</span> season can start from the second week of April to mid-May and end early to mid-June. The seasons can be highly affected by weather. The counts do get very high. Some species are known to cause allergic reactions.</p>
<p class="p4"><span class="s2"><strong>Pine, fir and spruce (Pinaceae family)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Spruce, fir and pine</span> season can begin mid-April to late May and end early to late July. The counts do get very high and they are important allergens to those who have allergies to this group.</p>
<p class="p4"><span class="s2"><strong>Plantains (Plantago sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Plantains</span> are important allergens. Low to moderate counts occur at this location. The season can start from early to mid-June and end late September to mid-October. They are considered important allergens even at low levels.</p>
<p class="p4"><span class="s2"><strong>Poplar, cottonwood and aspen (Populus sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Poplar, cottonwood and aspen</span> season starts from mid-March to early April and ends early to late May. The counts get very high and may cause allergic reactions.</p>
<p class="p4"><span class="s2"><strong>Ragweed (Ambrosia sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Ragweed</span> pollen is observed from mid-July until mid to late October with the highest counts occurring the second week of August to late September.</p>
<p class="p4"><span class="s2"><strong>Walnut (Juglans sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Walnut</span> season can start from early May to early June and end late May to the third week of June. Low and moderate counts are observed at this site. They can cause allergic reactions in highly sensitized individuals.</p>
<p class="p4"><span class="s2"><strong>Willow (Salix sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Willow</span> season can start from early to late April and end third week of May to early June. Certain years the counts can get in the high range. They may cause allergic reactions.</p>
<p class="p6">&nbsp;</p>
<p class="p1"><strong>Predominant Spores for Brampton, Ontario</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from April to mid-October. The highest counts occur from June to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from mid-March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season for this spore is very sporadic with some very high counts observed. It may be of significance in causing allergic reactions. The season is from June to mid-October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen although the counts do not get very high. The season is from May to the end of September.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some moderate and high counts from mid-April to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from late March to mid-October.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions and the season, with moderate and high counts, is from June to mid-October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, season is from mid-April to mid-October. Low to high counts are observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to mid-October with some high counts. Can cause allergic reactions.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing moderate and high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">The season for <span class="s1">leptosphaeria</span> is mid-May to mid-September with great fluctuations in counts from day to day. This is probably due to the effect of weather. Moderate and high counts are observed from April to mid-October.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts are observed from June to late September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from mid-March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range from June to mid-October.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Allergenicity is unknown but significant counts are observed from July to the end of September.</p>
<p class="p3"><strong><br /> <br /> Torula sp.</strong></p>
<p class="p4">Some species of <span class="s1">torula</span> are known to cause allergic reactions. Moderate counts are observed from June to mid-October. The season is sporadic.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also know as rusts do occur in really high numbers in the late summer but not enough is known about their significance in causing allergic reactions at these levels. The season is from early May to late October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts can reach high counts, allergenicity is unknown. The season is mid-April to mid-October with some high counts.</p>
<p class="p7">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->



<p class="p1"><strong>Predominant Pollen for Ottawa, Ontario</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4">There is a short early season for <span class="s1">alder</span> that can occur from the second week of March to the end of March. The main season can start late March to the second week of April and end early to late June. Some high counts can be observed and can cause allergic reactions. The season can vary from year to year in counts and when the season occurs due to the effect of weather.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can start early April during warm springs like 2010 and 2012. Generally the season start is from mid-April to early May and ends mid-May to early June. Some very high counts are observed. They can cause allergic reactions in highly sensitised individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4">The season for the <span class="s1">beech</span> trees varies a great deal from year to year. Some years hardly any pollen is produced while other years moderate counts are possible. Generally only low counts are observed. The season can last from one week to over a month. Season start can occur from the first to the third week of May and end the third week of May to the second week of June. They may not cause reactions except in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from mid to late April and end late May to mid-June. The start and end of the season can vary from year to year by as much as two weeks based on the effect of weather. Some very high counts are observed. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedar, juniper, and yew</span> season can start early to late March and end late May to mid-June. Some very high counts are observed but most species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s1">Chestnut</span> seasons vary from year to year. The season can start the second week of May to early June and end the first to last week of June. Most years only low counts are observed but moderate counts are also possible but rare.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. The season is highly affected by weather. The season can start mid-March to early April and end late April to mid-May. The amount of pollen released can vary from year to year and some years high counts are observed.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season can start from early to mid-May and end mid-September to early October. Moderate and high counts are observed from mid-May to late July.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary in the amount of pollen produced, season length and when the season starts and finishes. This is due to cyclical patterns and the effect of weather. The season can start from early to late May and end late May to mid-June. Mostly low counts are observed, but the occational moderate counts are possible.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s1">Hickory</span> season can vary in length from one to three weeks. The seasons fluctuate a great deal from year to year. The season can start from the first week to the third week of May and end early to mid-June. The counts are mostly in the low range with some moderate counts observed some years.</p>
<p class="p3"><strong>Linden, Basswood, Lime Trees (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Linden and basswood</span> season varies a great deal from year to year. Some years only low counts are observed while other years moderate counts are possible. The season can start the third week of June to the second week of July and end mid to late July. The length of the season also varies from year to year.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season fluctuates due to the number of species present and the effect of weather. There is a short early season that can occur from mid to late March. The main season can start from late March to almost mid-April and end mid-May to early June. Mostly low and moderate counts are observed with the occasional high counts. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s1">Mulberry</span> season can last almost a month. The season can start mid-April to early May and end late May to early June. Mostly low, with the occational moderate, counts are observed. Can be considered allergenic in idividuals who are highly sensitized.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria occur in significant numbers that may cause allergic reactions. The season can start early to mid-June and ends late September. Mostly low and moderate counts are observed. Important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start the first week of April to the first week of May and end late May to mid-June. The season can vary as to when it starts but also how much pollen is produced. This is mostly due to the effect of weather. High counts are observed and some species can cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">High counts of <span class="s1">pine, fir and spruce</span> are observed throughout the pollen season. The season start is generally from late April to the second week of May and ends early to mid-July. The pollen may cause reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> can be significant in causing allergic reactions. The season can start early to mid-June and end the second to last week of September. Only low counts are observed.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start the third week of March to early April and end early to late May. High counts are observed and allergic reactions can occur at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> pollen is observed starting the last two weeks of July with the high counts occurring from August to late September. Low pollen counts are observed until late October.They are considered to be highly allergenic.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> may cause allergic reactions in highly sensitized individuals. The season can start mid to late April and can end late May. Mostly low and moderate, with occasional high, counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p1"><strong>Predominant Spores for Ottawa, Ontario</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Some of the counts for <span class="s1">alternaria</span> are really high throughout the season and some species are known to cause allergic reactions. The season is from March to late October. The highest counts occur from late May to late October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The moderate and high counts are observed from late March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts do not get very high but may be of significance in causing allergic reactions. The season is sporadic and occurs from mid-June to mid-October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen even though the counts do not get very high. The season is from late May to mid-October.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Moderate counts are observed from August to mid-October. The season is sporadic. May not be an important allergen.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round and very high counts are known to occur from March to late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce moderate and high counts from early May to late October. Considered an important allergen.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> spore counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4"><span class="s1">Epicoccum</span> is found in high numbers and some species are known to cause allergic reactions. The season is from March to late fall. The high counts occur from mid-June to late October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, or powdery mildew, season occurs from April to mid-October with moderate and high counts.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The season occurs from March to mid-October.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to late October. Considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to mid-October producing moderate and high counts. The season is very sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is May to mid-October with great fluctuations in counts from day to day. This is probably due to the effect of weather. The counts are in the moderate and high range.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from August to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The moderate and high counts are observed from late March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season with high to low counts is from July to mid-October.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Allergenicity is unknown for polythrincium but significant counts are observed from July to mid-October.</p>
<p class="p3"><strong>Torula sp.</strong></p>
<p class="p4">Some species of <span class="s1">torula</span> are considered allergenic. Moderate counts are observed from July to early October.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also know as rusts do not occur in really high numbers, but not enough is known about their significance in causing allergic reactions at these levels. The season is from mid-May to late October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts can reach high counts, allergenicity is unknown. The season is mid-May to late October.</p>
<p class="p6">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->




<p class="p1"><strong>Predominant Pollen for Peterborough, Ontario</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from the second week of March to the first week of April and end early to mid-June. The counts vary from low to high due to the number of species present and the effect of weather. The season with the highest counts can occur from late March to late April. The alder are considered important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can last more than a month. The season can start early in warm years, like 2012, but generally the season startsthe first to third week of April and ends the mid to the end of May. The counts do get very high and can cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from one year to the next. This is partly due to natural cycles and the effect of weather. The season can produce very few low counts to a season that can last well over a month and low to moderate counts are observed. The season can start late April to almost mid-May and end mid-May to early June. They may not cause reactions except in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">The main <span class="s1">birch</span> season lasts more than a month and can start from late April to early May and end mid-May to early June with very high counts observed. They are important allergens, especially at these levels.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> season can start from early to the third week of March. The season can end from the first to the third week of June. The counts can get very high. Most species in Canada do not cause allergic reactions.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s1">Chestnut</span> season varies from year to year in when the season happens and how much pollen is observed. This is partly due to natural cycles and the effect of weather. The season can start from early May to early June and end mid to late June. Mostly low with occasional moderate counts are observed. The amount of pollen observed varies according to the weather.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> season can start from the second week of March to early April and end late April to mid-May. The counts can get from the low to high range depending on the year and weather. At higher levels, this pollen can be allergenic.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season is from late April to almost mid-October. Significant counts in the moderate and high ranges are observed from mid-May to late July.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary a great deal from year to year due to the effect of weather and cyclical patterns. The counts can range from low to moderate, depending on the year. The season can start from the second to third week of May and end late May to mid-June. Can cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s1">Hickories</span> have a season that can vary a great deal from year to year and can last from two to more than three weeks. The counts can be in the low to moderate range depending on the year. The season can start from early to late May and end the second to third week of June. The variation in season is partly due to the effect of weather. They can be considered important allergens.</p>
<p class="p3"><strong>Linden, Basswood, Lime Trees (Tilia sp.)</strong></p>
<p class="p4">The season for the <span class="s1">linden and basswood</span> season can vary from year to year and is also dependent on where the sampling location is situated. The season can start late June to almost mid-July and end mid to late July. Low and moderate counts are possible.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4">The season for the <span class="s1">maple</span> can start from the second week of March to early April and end mid to late May. The counts can reach high levels but the season varies from year to year, not only in when it occurs but also the pollen levels observed. Some of the species are considered allergenic.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s1">Mulberries</span> can have a very long season that can last over a month. The season can vary somewhat depending on where the sampling location is situated. The counts can get very high and can cause allergic reactions. The season can start from mid-April to early May and end late May to mid-June.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria pollen season can start mid-May to mid-June and end late September. The counts are in the low and moderate ranges. They are considered important allergens because of their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from early to late April and end early to mid-June. The counts do get very high and some species are considered allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">The season for the <span class="s1">spruces, firs and pines</span> varies from year to year due to the effect of weather. The season can last almost three months and can start mid-April to mid-May and end early to late July. Very high counts are observed and can be important in causing allergic reactions in individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> can play an important role in causing allergic reactions. The season can start from early to mid-June and end mid-September to early October. The counts do get in the moderate range.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood, and aspen</span> season can start early March in warm years like 2012. Generally the season starts from early to mid-April and ends early to late May. The counts can get in the very high range. They can cause allergic reactions at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4">Main ragweed season starts from the third week of July to early August with rare counts possible before these dates. The season ends with a heavy frost, which is well into October. Moderate and high counts are obtained from the second week of August to early October. They are considered important allergens.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4">The pollen season for the walnuts is highly affected by weather. The season can last well over a month and can start early to late May and end second to last week of June. Most years only low to moderate counts are observed but there are others where the counts are very high and the season lasts well over a month and a half.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> can start from the second to the third week of April and end mid to late May. Low, with the occasional moderate, counts are observed. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p1"><strong>Predominant Spores for Peterborough, Ontario</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Some high counts of <span class="s1">alternaria</span> are observed and certain species are known to cause allergic reactions. The season with high counts is from April to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from late March to well into October.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts do get high from June to early October and may be significant in causing allergic reactions.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> is considered an important allergen. Moderate counts are observed from May to late September.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to late October.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some very high counts from May to mid-October. It is considered an important allergen. This fungus produces significantly higher counts at this site than at most other sampling locations.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. This fungus can produce very high counts from March to early October. They may not cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from April to late October with some high counts from July to mid-October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, season is from mid-April to mid-October. Some high counts are observed. Allergenic properties are not well understood.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic from March to the end of September. The majority of the highest counts are observed from June to late September.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> or bracket fungus can produce very high counts from June to late October. During the month of May, the counts are moderate to high. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing moderate and high counts. The season is very sporadic. Allergenic properties are not well understood.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is April to mid-October with fluctuations in counts from day to day. This is probably due to the effect of weather. The highest counts are observed from June to the end of September. They can cause allergic reactions.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from March to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from late March to well into October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate and high counts of <span class="s1">pithomyces</span> are observed from mid-June to late September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also know as rusts do not occur in really high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from mid-May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> commonly referred to as smuts can reach high counts, but allergenicity is unknown. The season is May to late October.</p>
<p class="p5">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->



<p class="p1"><strong>Predominant Pollen for Toronto, Ontario</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start mid to late March and end from the first early to mid-June. There is a short season with low counts possible in January. Most years the counts are in the low to moderate range, although some years high counts are possible. The fluctuation in the season is due to the number of species present and the effect of weather. Can cause allergic reactions at these levels.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can start as ealry as the third week of March during warm years. It generally starts early to late April and ends mid to late May. High counts are observed and they could cause allergic reactions in sensitized individuals</p>
<p class="p3"><strong>Basswood (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Basswood</span> season varies from year to year due to weather and possible cyclical patterns. Most years only low counts are observed. The season can start the second to last week of June and end the second to last week of July.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span>, some years, produce moderate counts and other years hardly any pollen is observed. The season varies a great deal from year to year due to the effect of weather and possible cycles for this species. The season can start from mid-April to early May and end late April to the second week of May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from the first to the last week of April and end early to late June. High counts are observed most years. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4">The season for the <span class="s1">cedars, junipers and yews</span> can start late February to early March and end early to mid-June. Some years very high counts are observed. Most species found in Canada are not known to cause allergic reactions.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s1">Chestnuts </span>are important allergens. Mostly low counts are observed but certain years occasional moderate counts are possible. The season lasts approximately two to four weeks, depending on the year, and it can start from the third week of May to the first week of June and end the third week of June to the first week of July.</p>
<p class="p4">The <span class="s1">Horse Chestnut</span>, which is the most allergenic, is found only in low numbers. The season can start from the second to the third week of May and end the second to third week of June.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> has a short early season late February to early March. The main season can start second week of March in a warm year, but generally the season starts from the third week of March to early April and ends mid-April to mid-May. Some years very high counts are possible. At these levels they could cause allergic reactions.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season can start, with low counts, as early as mid-April to early May and end early to mid-October. Moderate and high counts are observed from the third week of May to the third week of July .</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary a great deal from year to year. This is probably due to the effect of weather and cyclical patterns. Most years only produce low counts but moderate counts are possible. The season can start from early to late May and end late May to mid-June.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4"><span class="s1">Hickory</span> season lasts two to four weeks and can start the third week in April to early May and end from the second to the last week of June. Mostly low counts are observed with the occasional moderate possible.</p>
<p class="p3"><strong>Horse Chestnut and Buckeye (Aesculus sp.)</strong></p>
<p class="p4"><span class="s1">Horse Chestnut</span>, which is the most allergenic of all chestnuts, is found only in low numbers. The season can start from the second to the third week of May and end the second to third week of June.</p>
<p class="p3"><strong>Linden (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Linden</span> season varies from year to year due to weather and possible cyclical patterns. Most years only low counts are observed. The season can start the second to last week of June and end the second to last week of July.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple and Box Elder</span> season varies due to the number of species present and the effect of weather. The counts do get very high, particularly from mid to late April. The main season can start from the second to the last week of March and end the first to last week of May to early June. There is a short early season that can occur late Feruary to early March. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p4"><span class="s1">Mulberry</span> season can last over two months. The counts do get very high and they play an important role in causing allergic reactions at these levels. The season can start as early as mid-April in a warm year, but generally the season starts from late April to second week of May and ends late May to mid-June.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria are considered important allergens due to their small size. The season can start late May and end late September. Mostly low counts are observed with rare moderate counts possible.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season is highly affected by weather. The season can start as early as the last week of March in a warm year, but generally it startsfrom the second to last week of April and ends from the end of May to the second week of June. High counts are observed. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Moderate and high counts are observed from May to late June for the<span class="s1"> pine, fir and spruce</span>. The time of the season can vary from year to year by as much as three weeks. The season can start as early as mid-April in a warm year, but generally it starts from the first to the second week of May and ends late June to mid-July.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> can be important allergens. Only low counts are observed at this location. Even at these levels they can cause reactions in highly sensitized individuals. The season can start early to mid-June and end late September.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start as early as mid-March in a warm year, but generally it starts from late March to mid-April and ends early to mid-May. High counts are observed and at these levels they can cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can start from from the first to the third week of July and end late October, or with a hard frost. The highest counts occurring the second week of August to the third week of September.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4"><span class="s1">Walnut</span> season can start from the first to the third week of May and end early to mid-June. The season can vary from year to year. Most years low and moderate counts are observed.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season can start form the first to the third week of April and end from early to late May. Low and moderate counts are observed.</p>
<p class="p1"><strong>Predominant Spores for Toronto, Ontario</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from mid-March to late fall.</p>
<p class="p3"><strong>Boletus sp</strong></p>
<p class="p4">The season for the <span class="s1">Boletus</span> spore is very sporadic with some very high counts observed. It may be of significance in causing allergic reactions. The season is June to mid-October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen although the counts do not get high. The season is June to mid-October.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> &ndash; Mushroom can produce some moderate and high counts from late April to late October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4">Counts for <span class="s1">Diatrypaceae</span> are sporadic throughout the whole counting season. High counts can be observed from late March to mid-October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">Epicoccum</span> are known to cause allergic reactions. The season is from May to late fall with some high counts observed.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4">The season for <span class="s1">Erysiphe</span> also known as Powdery mildew is from late April to mid-October. Low and high counts are observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4">Counts for <span class="s1">Fusarium</span> are very sporadic throughout the whole counting season. The majority of the season occurs from May to mid-October with low to moderate counts observed.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> also known as Bracket fungus can produce very high counts from June to late October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from mid-April to the end of September producing moderate and high counts. The season is sporadic.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">The season for <span class="s1">Leptosphaeria</span> is late March to late October with great fluctuations in counts from day to day. This is probably due to the effect of weather. Moderate and very high counts are observed from mid-May to late October.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Low to occasional high counts are observed from June to early October.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low range from July to the end of September. May not cause allergic reactions at these levels.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from mid-March to late fall.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Allergenicity is unknown but significant counts are observed from August to the end of September.</p>
<p class="p3"><strong>Torula sp.</strong></p>
<p class="p4">Some species of <span class="s1">Torula</span> are known to cause allergic reactions. The occasional moderate counts are observed from June to early October. Season is sporadic.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> a.k.a Rusts do not occur in really high numbers and not enough is known about their significance in causing allergic reactions at these levels. The season is from June to late October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> a.k.a Smuts can reach high counts in the fall, and allergenicity is unknown. The season, with low and moderate counts, is May to well into November.</p>
<p class="p5">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->



<p class="p1">&nbsp;</p>
<p class="p1">&nbsp;</p>
<p class="p2"><strong>Predominant Pollen for Windsor, Ontario</strong></p>
<p class="p3">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p4"><strong>Alder (Alnus sp.)</strong></p>
<p class="p5"><span class="s1">Alder</span> season occurs from late February to mid-June. The counts fluctuate mostly from low to moderate. Occasionally high counts occur during the early season. The alder season is highly affected by weather. They can be significant in causing allergic reactions.</p>
<p class="p4"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p5"><span class="s1">Ash</span> pollen season can last approximately up to six weeks and can start from the end of March to late April and end mid-May to early June. The counts range from low to high throughout the season and they are considered to be allergenic in highly sensitized individuals.</p>
<p class="p4"><strong>Beech (Fagus sp.)</strong></p>
<p class="p5">Some years <span class="s1">beech</span> produce moderate counts and other years hardly any pollen is observed. The season varies a great deal from year to year due to the effect of weather and possible cycles for this species. The season can start from mid-April to mid-May and end mid to late May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p4"><strong>Birch (Betula sp.)</strong></p>
<p class="p5"><span class="s1">Birch</span> season can begin from the first to third week of April and end around mid-May to early June. Generally the counts are low and moderate. Rare high counts can occur. The timing of the season can vary from year to year as well as the amount of pollen produced. They are considered important allergens.</p>
<p class="p4"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p5"><span class="s1">Cedars, junipers and yews</span> can produce low to high counts from about mid-February to early June. The season is very sporadic due to the number of species present and the effect of weather.</p>
<p class="p4"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p5">Chestnuts are important allergens and the season lasts approximately four weeks. The season can start from the second to the fourth week of May and end mid-June to early July. The Horse Chestnut, which is the most allergenic, is only found in low numbers.</p>
<p class="p6">&nbsp;</p>
<p class="p6">&nbsp;</p>
<p class="p4"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p5"><span class="s1">Elm</span> season can last about four to five weeks with an early season that occurs late February to early March with low and the occasional moderate counts possible. The main season can begin from mid-March to early April and end mid to late April. The types of seasons that occur every year is partially dependent on weather. The counts can get high with mostly low and moderate counts observed through the season. The elms are important allergens in individuals who are sensitized.</p>
<p class="p4"><strong>Grasses (Gramineae family)</strong></p>
<p class="p5"><span class="s1">Grasses</span> produce moderate to high counts from mid-May to mid-July. The season starts from mid to late April and ends around mid-October, depending on the season. There is another peak with moderate counts early September. This species is unique to certain sites (Montreal being another location). The grass season starts late April and lasts until late October.</p>
<p class="p4"><strong>Hickory (Carya sp.)</strong></p>
<p class="p5"><span class="s1">Hickories</span> have a short early season towads the end of April. The main season can last almost a month. The season can start early May to late May and end early to late June. Some moderate counts can be observed in the main season.</p>
<p class="p4"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p5"><span class="s1">Maples</span> have more than one season because of the number of species present at this site. The first season, which lasts approximately one and a half weeks, can occur from mid-February to early March with generally only low counts observed. This season may not occur or may be missed due to how early it occurs.<br /> The main season can start mid to late March and ends early to late May or early June. Significant counts can be observed ranging from low to high. The seasons vary from year to year not only for the timing but for the amount of pollen produced. Some species are known to cause allergic reactions.</p>
<p class="p4"><strong>Mulberry (Morus sp.)</strong></p>
<p class="p5"><span class="s1">Mulberry</span> season can last from four to five weeks. The season can start from mid-April to mid-May and end late May to mid-June. There are many species found at this site and the counts can be very high. They can cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p4"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p5"><span class="s1">Nettles </span>and parietaria occur in significant numbers that may cause allergic reactions and are important, especially due to their small size. The season usually starts from the second week of May to late May and ends late September.</p>
<p class="p6">&nbsp;</p>
<p class="p5"><span class="s2"><strong>Oak (Quercus sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Oak</span> season, in warm years like 2012, can start late March. Generally the season starts early early to late April and end from mid-May to mid-June. The seasons can vary a great deal from year to year which is mostly attributable to weather conditions. The counts can reach very high levels and certain species are highly allergenic.<br /> <span class="s4"><strong><br /> </strong></span><span class="s2"><strong>Pine, fir and spruce (Pinaceae family)<br /> </strong></span><span class="s5"><strong><br /> </strong></span>Season fluctuates a great deal for <span class="s1">pine, spruce and firs</span> due to the effect of weather and the number of species present. The season can start from late March to late April and end early to mid-June. High counts are observed and can be of significance to those individuals who suffer from allergies to this group.</p>
<p class="p5"><span class="s2"><strong>Plantains (Plantago sp.)<br /> </strong></span><span class="s6"><br /> </span><span class="s1">Plantains</span> are important allergens. Moderate and high counts occur at this location. The season can start late May to mid-June and end late September. They are considered important allergens even at low levels.</p>
<p class="p5"><span class="s2"><strong>Poplar, cottonwood and aspen (Populus sp.)<br /> </strong></span><span class="s4"><strong><br /> </strong></span><span class="s1">Poplar, cottonwoods and aspen</span> season is very dependent on weather conditions. An early season can occur late February to early March, if the weather conditions are favourable. The main season can start from early March to early April and end early to late May. The timing of the season as well as the amount of pollen produced is highly affected by weather. The counts can reach the high range and may cause allergic reactions.</p>
<p class="p5"><span class="s2"><strong>Ragweed (Ambrosia sp.)<br /> </strong></span><span class="s3"><strong><br /> </strong></span><span class="s1">Ragweed</span> pollen occurs mid-July to well into October. Low counts can be observed early July. The season is mostly from mid-July to well into October. Moderate and high counts can occur from August to mid-October.</p>
<p class="p5"><span class="s2"><strong>Walnut (Juglans sp.)<br /> </strong></span><strong><br /> </strong><span class="s1">Walnut</span> season lasts approximately a month. The season can occur from early May to mid-May and end the firs to third week of June. The beginning of the season can be sporadic. Low and moderate counts are observed.</p>
<p class="p5"><span class="s2"><strong>Willow (Salix sp.)<br /> </strong></span><strong><br /> </strong><span class="s1">Willows</span> have a long season that lasts almost two months. The season starts from late March to mid-April and can end from mid-May to almost mid-June. The counts vary from low to moderate throughout the season. There are several species and they cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p6">&nbsp;</p>
<p class="p2"><strong>Predominant Fungal Spores (Mold) for Windsor, Ontario</strong></p>
<p class="p3">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p4"><strong>Alternaria sp.</strong></p>
<p class="p5"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season, with significant counts, is from early April to the end of October.</p>
<p class="p4"><strong>Aspergillus sp.</strong></p>
<p class="p5"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from mid-March to late fall.</p>
<p class="p4"><strong>Boletus sp.</strong></p>
<p class="p5"><span class="s1">Boletus</span> counts for this mushroom spore do get high and may be of significance in causing allergic reactions. The season is early June to mid-October.</p>
<p class="p4"><strong>Botrytis sp.</strong></p>
<p class="p5"><span class="s1">Botrytis</span> may be a significant allergen although the counts do not get very high. The season is May to early October.</p>
<p class="p4"><strong>Cladosporium sp.</strong></p>
<p class="p5"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but very high counts are known to occur from mid-February to well into November.</p>
<p class="p4"><strong>Coprinus sp.</strong></p>
<p class="p5"><span class="s1">Coprinus</span> mushroom can produce very high counts from late April to mid-October. It is considered an important allergen.</p>
<p class="p4"><strong>Diatrypaceae sp.</strong></p>
<p class="p5"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October. They are not known to cause allergic reactions.</p>
<p class="p4"><strong>Epicoccum sp.</strong></p>
<p class="p5">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from March to the end of October with some high counts from August to early October.</p>
<p class="p6">&nbsp;</p>
<p class="p4"><strong>Erysiphe (Oospora) sp</strong></p>
<p class="p5"><span class="s1">Erysiphe</span>, also know as Powdery mildew, season with the highest counts is from May to mid-October. Mostly moderate counts are observed.</p>
<p class="p4"><strong>Fusarium sp.</strong></p>
<p class="p5"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from April to mid-October with some high counts.</p>
<p class="p4"><strong>Ganoderma sp.</strong></p>
<p class="p5"><span class="s1">Ganoderma</span> or bracket fungus can produce very high spore counts from mid-May to mid-October. It is considered an important allergen.</p>
<p class="p4"><strong>Helicomyces sp.</strong></p>
<p class="p5"><span class="s1">Helicomyces</span> season, with high counts, is from May to the end of September. The season is very sporadic.</p>
<p class="p4"><strong>Leptosphaeria sp.</strong></p>
<p class="p5"><span class="s1">Leptosphaeria</span> season is late March to mid-October with great fluctuations in counts from day to day. This is probably due to the effect of weather. Very high counts occur in the months of May to early October.</p>
<p class="p4"><strong>Myxomycetes</strong></p>
<p class="p5">Moderate counts of myxomycetes are observed from late April to mid-October.</p>
<p class="p4"><strong>Penicillium sp.</strong></p>
<p class="p5"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. The highest counts are observed from mid-March to late fall.</p>
<p class="p4"><strong>Pithomyces sp.</strong></p>
<p class="p5"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range from June to mid-October.</p>
<p class="p4"><strong>Polythrincium sp.</strong></p>
<p class="p5">Allergenicity for polythrincium is unknown but significant counts are observed from the end of May to the end of September.</p>
<p class="p6">&nbsp;</p>
<p class="p6">&nbsp;</p>
<p class="p6">&nbsp;</p>
<p class="p4"><strong>Torula sp.</strong></p>
<p class="p5">Some species of <span class="s1">torula</span> are known to cause allergic reactions. Moderate and some high counts are observed from late June to mid-October. Season is sporadic.</p>
<p class="p4"><strong>Uredinales sp.</strong></p>
<p class="p5"><span class="s1">Uredinales</span> a.k.a rusts can occur in really high numbers but not enough is known about their significance in causing allergic reactions at these levels. The main season is from mid-May to late October.</p>
<p class="p4"><strong>Ustilaginales sp.</strong></p>
<p class="p5"><span class="s1">Ustilaginales</span> or smuts can reach high counts, and allergenicity is unknown. The main season is late April to mid-October with some high counts.</p>
<p class="p7">&nbsp;</p>



`,
    },
    {
      id: 8,
      name: 'Quebec',
      html: `<p class="p1"><strong>Predominant Pollen for the Montreal, Quebec region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from mid-March to almost mid-April and end mid to late June. The season fluctuates from year to year and the counts are usually in the low to moderate range.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season can start mid-April to early May and end mid-May to early June. High counts are observed and allergic reactions can occur in sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can start late April to the second week of May and end late May to early June. The seasons fluctuate from year to year due to cyclical patterns and weather. Occasionally moderate counts can be observed but most years the counts are low. At these levels they may not cause allergenic reactions.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start mid-March in warm years like 2010 and 2012. Generally the season start is from late March to the second week of April and ends late May to the third week of June. The counts get in the very high range. They are considered to be important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4">Season for the <span class="s1">cedars, junipers, and yews</span> can start the second week of March to early April and end late May to early June. Some high counts are observed. Most species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Chestnuts (Castenea sp.)</strong></p>
<p class="p4"><span class="s1">Chestnut</span> season can start from mid-May to the second week of June and end mid-June to early July. The counts are usually in the low to moderate range but some years high numbers are observed. Some of the species are considered allergenic.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. The main season can start early to mid-April and end late April to mid-May. Moderate and high counts can be observed in the main season.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season can start from early to mid-May and end early October. Moderate counts are observed from late May to mid-July. This site has another season with significant counts late August to mid-September. This species of grass is unique to certain sites.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary from year to year. This is partly due to cyclical patterns and the effect of weather. Some years moderate and high counts are possible, whereas other years only sporadic low counts are observed. The season can start from early to late May and end late May to mid-June.</p>
<p class="p3"><strong>Hickory (Carya sp.)</strong></p>
<p class="p4">Season for the <span class="s1">hickories</span> can vary in length and pollen levels from year to year. The season can start mid-May to early June and end mid to late June. Mostly low counts are observed, but certain years moderate ones are possible.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies due to the number of species and the effect of weather. The season can start mid-March to the second week of April and end the third week to last week of May. The counts can get in the high range and some species are considered important in causing allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria season can start from the first week to the last week of June and end late September. Moderate and occasionally high counts are observed. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start mid-April to early May and end late May to mid-June. Very high counts are observed and certain species are known to cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Season for <span class="s1">pine, fir and spruce</span> can start late April to mid-May and end early to mid-July. Some of the counts do get high. These are important allergens to those who have allergies to this group of trees.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> can be of significance in causing allergic reactions. The season can start late June to almost mid-July and end mid-September to early October. Only low counts are observed.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from about mid-March to early April and end early to late May. Very high counts are observed and allergic reactions can occur at these levels.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can start the third week of July to early August and can end late October or when there is a hard frost. Moderate and high counts occur in August and most of September.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrushes</span> and wormwoods produce mostly low and the occasional moderate count from the first week of July to early October. May be a source of allergenicity.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season can start from almost mid-April to late April and end late May to early June. Only low to moderate counts are observed so they may not cause allergic reactions except in individuals who are highly sensitized.</p>
<p class="p1"><strong>Predominant Spores for the Montreal, Quebec region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts can get really high and some species are known to cause allergic reactions. The main season is from May to late October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. Significant counts are observed from March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts for this spore do not get very high but may be of significance in causing allergic reactions. The main season is June to mid-October.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen even though the counts do not get very high. The season is July, August and September.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Moderate counts of caloplaca occur from the end of August to mid-October. The season is sporadic and it may cause allergic reactions.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. This spore exists all year round but the highest counts occur from March to late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce high counts from May to late October. Considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from March to well into October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4"><span class="s1">Epicoccum</span> is not found in really high numbers but some species are known to cause allergic reactions. Season is July to late fall.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from mid-April to mid-October. Significant counts are mostly in the moderate range.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from mid-June to mid-October.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> also known as bracket fungus can produce very high counts from June to late October. Considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4">Majority of <span class="s1">helicomyces</span> season is from May to the end of September.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate counts of myxomycetes are observed from March to September.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. Significant counts are observed from March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is August and September.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Allergenicity is unknown for polythrincium but significant counts are observed from the end of July to the end of September.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> or rusts do not occur in really high numbers and not enough is known about their significance in causing allergic reactions at these levels. The main season is from June to late October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> also know as smuts can reach high counts, but allergenicity is unknown. The season is May to late October.</p>
<p class="p1"><strong>Predominant Pollen for the Qu&eacute;bec City, Qu&eacute;bec region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> counts fluctuate throughout the season from year to year due to the number of species found and the effect of weather. A short early season, with low counts, may occur from the second to the last week of March. The main season can start from late March to mid-April and end early to late June. Some years high counts are observed. They are considered important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> counts observed can be in the low to high range and will cause allergic reactions in those individuals who are highly sensitized. The season lasts well over a month. The season can start the third week of April to mid-May and end the third week of May to almost mid-June.tart from mid-April to the third week of April and end late May to early June.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can start from early to late May and end late May to the second week of June. The seasons vary from year to year due to the effect of weather and normal cyclical patterns. Some years moderate counts are observed and other years only low sporadic ones are captured.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">Very high <span class="s1">birch</span> counts are observed but the season dates and counts fluctuate from year to year due to the effect of weather. The season can start from late April to mid-May and end the first to third week of June. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> produce low to high counts. The season can start from early March to early April and end mid-May to early June. The species found in Canada are generally not considered allergenic.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are considered important allergens. An early season can occur from mid-March to early April. The main season can start from early to late April and the season end is from early to late May. High counts are observed.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4">Early low sporadic counts of <span class="s1">grasses</span> can occur in early May. The main grass season can start from the second to last week of May and ends early to mid-October. Moderate counts for the grasses occur from June to mid-July. The grasses are important allergens</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season can vary a great deal from year to year. This is due to the effect of weather and natural cyclical patterns. Some years sporadic only low counts are observed, whereas other years moderate and high counts are captured. The season starts from mid-May to early June and ends early to mid-June. May cause allergic reactions in individuals who are highly sensitized when shed in high numbers.</p>
<p class="p3"><strong>Larch and Tamarack (Larix sp.)</strong></p>
<p class="p4">Larch and tamarack can vary a great deal from year to year due to the effect of weather and cyclical patterns. Some years only low and sporadic counts are observed while other years moderate counts are captured. The season can start from the third week of April to early May and end early to late May.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> has an early season that lasts approximately one week and can occur from late March to early April. The main season can start from the first to the last week of April and can end mid to early June. Moderate and high counts are observed. Certain species are important in causing allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria are considered important allergens due to their small size. Mostly low, with the occasional moderate, counts are observed. The season can start from late June to the first week of July and end late August to mid-September.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from the first to the third week of May and end late May to early June. The season can be affected by weather. Most years high counts are produced and certain species are known to cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">High counts of <span class="s1">pine, fir and spruce</span> are observed throughout the season. The pollen season can start from the first to third week of May and end late June to mid-July. The variation in when the season occurs is due to the effect of weather. This is a very important group of trees to individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> season can start the second week of June to early July and end late September to early October. Only low counts are observed. Can be a significant allergen even at low levels.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplars, cottonwood and aspen</span> produce high counts. The season can start from the third week of March to the second week of April and end early to late May. Allergic reactions may occur in highly sensitized individuals.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can start from early to mid-July and ends well into October with a solid frost. Moderate and high counts are observed from early August to mid-September. They are considered to be a significant allergen.</p>
<p class="p3"><strong>Walnut (Juglans sp.)</strong></p>
<p class="p4"><span class="s1">Walnuts</span> are considered important in causing allergic reactions. The pollen season can start from the second week of May to early June and can end early to late June. The season can vary a great deal from year to year due to weather and cyclical patterns. Low and sometimes sporadic counts will be observed whereas an occasional year can produce moderate and high counts.</p>
<p class="p1"><strong>Predominant Spores for the Qu&eacute;bec City, Qu&eacute;bec region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Most of the significant counts of <span class="s1">alternaria</span> are found from June to mid-October and are in the low to high range. May not cause disease except in highly sensitized individuals.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">aspergillus</span> occur throughout the whole counting season with the high counts occurring from March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4">The main <span class="s1">boletus</span> season is from June to mid-October. Moderate and high counts are observed from July to mid-October. It is considered to be an important allergen.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> counts are mostly in the low to moderate ranges from late May to early October.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Caloplaca season is very sporadic. Moderate counts are observed from July to mid-October. May not be a significant allergen.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is found throughout the whole counting season. High counts are observed late March to late fall. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">Moderate and high counts of <span class="s1">coprinus</span> are observed and the season is from May to late fall. Considered significant in causing allergic reactions.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are very sporadic and vary throughout the whole counting season. Very high counts are observed from March to late October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Low and moderate counts of <span class="s1">epicoccum</span> are observed from June to mid-October. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from the end of April to late October. The counts range from low to high. May not be an important allergen.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> has a sporadic season with low to high counts observed from April to mid-October.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4">Moderate and very high counts of <span class="s1">ganoderma</span> are observed from late May to late fall. Considered significant in causing allergic reactions.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is very sporadic with low to high counts observed from late April to the end of September.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is from late April to mid-October with great fluctuations in counts from day to day which is due to the effect of weather and the number of species present. Some very high counts are observed for both groups. Can cause allergic reactions.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Low to moderate counts of myxomycetes are observed from late March to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">penicillium</span> occur throughout the whole counting season with the high counts occurring from March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Moderate counts of <span class="s1">pithomyces</span> are observed from July to early October.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Low and moderate counts of polythrincium are observed from late June to mid-October.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also know as rusts produce low to moderate counts from late May to mid-October. Allergenic properties are not well understood.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts produce low to high counts from late May to mid-October. Allergenic properties are not well understood.</p>
<p class="p1"><strong>Predominant Pollen for the Sherbrooke, Qu&eacute;bec region</strong></p>
<p class="p6">The tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start mid-March to early April and end early to late June. Moderate and high counts can occur. Alders are considered important allergens.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season can start from mid-April to early May and end mid-May to early June. Some very high counts can be observed and this could cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season varies a great deal from year to year. This is partly due to cyclical patterns and weather. The season can start from early to mid-May and end late May to the second week of June. Most of the counts are low but in rare years moderate counts are observed.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season can start from mid-April to early May and end early to late June. Very high counts are observed and they are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars</span>, junipers and yews season starts from early to late March and ends late May to early June. Very high counts can be observed but most species in Canada are not considered allergenic.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are highly allergenic. An early sporadic season, with low counts, can ocur the third week of May to early April. The main season, which usually has moderate counts, can start the second to third week of April and end late April to early May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season can start early to mid-May and end early October. Moderate and the occasional high counts are observed from early June to late July.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlock</span> season lasts approximately one to three weeks and varies a great deal from year to year. The season can start from the second week of May to early June and end the third week of May to the second week of June. Some years moderate and high counts are possible.</p>
<p class="p3"><strong>Hop Hornbeam (Ostrya sp.) &amp; Hornbeam (Carpinus sp.)</strong></p>
<p class="p4">Low to moderate counts are possible for <span class="s1">Hop Hornbeam</span> &amp; <span class="s1">Hornbeam</span>. The season can start late April to early May and ends late May. Some species can cause allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Larch (Larix sp.)</strong></p>
<p class="p4">Larch season can vary a great deal from year to year. The season can produce moderate counts or very sporadic low counts. The season can start mid to late April and end late April to early May.</p>
<p class="p3"><strong>Maple and Box Elder (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maples and Box Elder </span>can have a short early season from mid to early April. The main season can start from early to mid-April and end mid to late May. Some very high counts are observed and some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and the parietaria produce low and moderate counts. The season can start mid to late June and end mid to late September. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from mid-April to early May and end the third week of May to early June. The counts can get high and some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">High counts are observed throughout the season for <span class="s1">pine, fir and spruce</span>. The pollen season can start from late April to the second week of May and ends early to late July. This group of trees are important to those individuals sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantains</span> produce mostly low and occasional moderate counts. The season can start late May to early June and late September. They can cause allergic reactions even in low numbers to sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> produce very high counts which can cause allergic reactions. The season can start from the third week of March to the third week of April and end early to mid-May. The season can start early in warm years like 2010 and 2012.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can begin from mid-July to early August and end early to mid-October or with a heavy frost. Moderate counts can be observed from the second week of August to early September.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrushes</span> and wormwoods produce mostly low and the occasional moderate count from the second week of July to early October. May be a source of allergenicity.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season lasts about four weeks. The season can start mid to late April and end mid to late May. Occasional moderate counts are possible which may cause allergic reactions in sensitized individuals.</p>
<p class="p1"><strong>Predominant the Spores for Sherbrooke, Qu&eacute;bec region</strong></p>
<p class="p7">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Most of the significant counts for <span class="s1">Alternaria</span> are found from June to mid-October and are generally in the low to high ranges. May not cause allergic reaction except in highly sensitized individuals.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4">Significant counts for <span class="s1">Aspergillus</span> occur throughout the whole counting season with high counts occurring from March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season is from June to the end of October. Late July to October is when the highest counts are observed.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4">Counts for <span class="s1">Botrytis</span> are in the low to moderate ranges from April to early October.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Moderate and high counts are observed from mid-May to late September. Season is very sporadic. May not be an important cause in allergic reactions.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> are found throughout the whole counting season. High counts are observed in March and April with very high counts starting June to late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">High counts of <span class="s1">Coprinus</span> are observed with the season running from May to late fall. May be an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4">Counts for are <span class="s1">Diatrypaceae</span> are very sporadic and vary throughout the whole counting season. Very high counts are observed from March to late October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Low to high counts of <span class="s1">Epicoccum</span> occur from June to mid-October.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span> aka Powdery mildew season starts mid-April until mid-October. Counts are in the low to very high ranges. May not be an important allergen</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4">Sporadic counts of <span class="s1">Fusarium</span> are observed throughout the whole collecting season. Moderate to high counts are observed from May to early October.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">Ganoderma</span> are observed from June to mid-October. May be an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4">The season for <span class="s1">Helicomyces</span> is very sporadic and low to high counts are observed from April to mid-October.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> is found in air samples, food, soil and plant material. The season is from February to mid-October. The counts vary from day to day, which is probably due to the effect of weather. Low to high counts are observed. They can cause allergic reactions, asthma attacks and skin infections.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Low and moderate counts are observed from May to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4">Significant counts of&nbsp; <span class="s1">Penicillium</span> occur throughout the whole counting season with high counts occurring from March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4">Low to moderate counts of <span class="s1">Pithomyces</span> are observed from June to early October.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Very high counts are observed from June to the end of September.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> commonly named Smuts produce low to high counts from May to mid-October. Allergenicity is unknown.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also commonly referred to as Rusts produce low to high counts from May to mid-October. Allergenic properties are not well understood.</p>
<p class="p8">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->`,
    },
    {
      id: 9,
      name: 'Prince Edward Island',
      html: `<p class="p1"><strong>Predominant Pollen for the Charlottetown, Prince Edward Island region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can vary from year to year due to weather. In warm years like 201 and 2012 the season can start close to mid-May. Generally the season starts from the first to the second week of April and ends the first to the third week of June. The counts can fluctuate from low to high throughout the season. They are considered important allergens.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> season can generate mostly low and the occasional moderate counts. The season can start from mid-April to early May and end late May to the second week of June. At these levels they may cause allergic reactions only in highly sensitized individuals.</p>
<p class="p3"><strong>Beech (Fagus sp.)</strong></p>
<p class="p4"><span class="s1">Beech</span> season can vary a great deal from year to year due to cyclical patterns and the effect of weather. Some years only low counts are observed but moderate counts are possible in certain years. The season can start from early to late May and end the third week of May to the first week of June.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">There are two distinct seasons for <span class="s1">birch</span>. The first one lasts less than one week and can occur the last two weeks of April. The main season can start late April to the second week of May and end from the first to the third week of June. Most years high counts are observed. The season can be affected by weather. They are considered important allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4">There is an early sporadic season for <span class="s1">cedars, junipers, and yews</span> with only low counts possible from mid to late March. The main season can start late March to the third week of April and ends late May to mid-June. The amount of pollen released varies from year to year. Some years only produce low counts whereas other years moderate and high counts are observed. They may not play an important role in allergic reactions.</p>
<p class="p3"><strong>Compositae family</strong></p>
<p class="p4">The composite family, for which many are flowering plants, produce sporadic counts from August to the end of September. Some are considered important in causing allergic reactions.</p>
<p class="p3"><strong>Dock weed &amp; Sheep sorrel weed (Rumex sp.)</strong></p>
<p class="p4"><span class="s1">Dock weed &amp; sheep sorrel weed</span> are important allergens. High counts are observed. The season can start from the third week of May to the second week of June and end early to late August. The most significant counts can occur in June to early July.</p>
<p class="p3"><strong>Goldenrod (Solidago sp.)</strong></p>
<p class="p4">Goldenrod is a flowering plant, which produces sticky pollen and is mostly insect pollinated. The plant, however, is abundant at this collection site and sometimes significant number of pollen grains are captured on our samples. Mostly low, with an occasional moderate, counts are observed. The season can start from late July to early August and end mid-September to early October.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season starts mid to late May and ends late September to mid-October. Very high counts are observed in the months of June and July.</p>
<p class="p3"><strong>Hemlock (Tsuga sp.)</strong></p>
<p class="p4"><span class="s1">Hemlocks</span> usually only produce low counts but rare moderate counts can occur. The season varies a great deal from year to year due to the effects of weather and cyclical patterns. The season can start from mid-May to early June and end late May to the third week of June.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season can have a very short early season, with low counts, from late March to mid-April. The main season, which lasts well over a month, can start from mid to late April and end the third week of March to early June.</p>
<p class="p4">The amount of pollen observed can vary from year to year. Some years only low and the occasional moderate counts are observed. Other years some high counts can be observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4">The counts for the <span class="s1">nettles</span> are always low but they are important allergens due to their small size. The season can start from mid-June to early July and end late August.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can vary from year to year and is highly effected by weather. Generally only low counts are observed. Occasional moderate counts are observed during certain years. The season can start from the first to the third week of May and end late May to the third week of June. Certain species can cause allergic reactions.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Very high counts of <span class="s1">pine, spruce and firs</span> are observed and the season can start from the second to last week of May and end from the early to mid-July. Significant allergens for individuals who are sensitized.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> season can start from the first to the third week of June and end mid to late September. Mostly low, with the occasional moderate, counts are observed. Even low counts can cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar and aspen</span> season can last well over a month. There is a short early season with only low counts that may occur from the third week of March to the second week of April. The main season can start the first to the third week of April and end the first week to the end of may. The amount of pollen observed from year to year can vary and some seasons high counts are observed. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4">Low counts of <span class="s1">ragweed</span> are observed for the ragweed at this location. The season can start from late July to mid-August and end late September to mid-October.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willow</span> season can be sporadic. Low and moderate counts can be observed. The season starts from the third week of April to early May and ends late May to mid-June. May only cause allergic reactions in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Spores for the Charlottetown, Prince Edward Island region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4">Moderate to high counts of <span class="s1">alternaria</span> are observed from mid-June to mid-October. Some species are known to cause allergic reactions.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4">High counts of <span class="s1">aspergillus</span> are observed from mid-March until fall. They are considered important allergens.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> is a type of mushroom where significant number of spores are observed from mid-June to mid-October. Considered an important allergen.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">Caloplaca is sporadic throughout the counting season with some high counts from May to mid-October. Medical significance is unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is one of the spores that can be found all year round. The relevant counts start in late March and the highest counts are seen from late May until fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4">Significant counts of <span class="s1">coprinus</span> are observed from mid-May to mid-October. Considered to be a significant allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4">Very sporadic counts <span class="s1">diatrypaceae</span> are observed from late March to late fall. Clinical significance is unknown.</p>
<p class="p3"><strong>Drechslera</strong></p>
<p class="p4">Drechslera counts are never very high. This is mostly a summer and fall spore. There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is Bipolaris sp.</p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">July to mid-October is when the highest counts of <span class="s1">epicoccum</span> are seen in our samples. The counts may reach high enough numbers to be of clinical significance.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, sees moderate to high counts observed from April to mid-October. Clinical significance is not known.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts fluctuate throughout the season which is normal for this fungus. The majority of the season is from May to late fall. A significant allergen.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> spore is by far the most prevalent for total spores during the whole counting season. This is unusual since normally Cladosporium has the highest total count for the season in any location, so the abundance of Ganoderma is unique to this site. Considered to play an important role in allergic reactions and asthma. Very high counts are observed from June to late October.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4">Very high counts of <span class="s1">helicomyces</span> are observed throughout our counting season. Counts are very sporadic which is due to the effect of weather and the number of species present. Highest counts occur from June to mid-October.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">Sporadic counts of <span class="s1">leptosphaeria</span> are observed from late April to late fall. Very high counts are observed and they could be of medical significance.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Sporadic counts of myxomycetes are observed from late March to the end of September. Mostly in the moderate range.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4">High counts of <span class="s1">penicillium</span> are observed from mid-March until fall. They are considered important allergens.</p>
<p class="p3"><strong>Polythrincium sp.</strong></p>
<p class="p4">Moderate counts of polythrincium are observed from mid-June to mid-October. Medical significance is unknown.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also know as rusts are found in high numbers from June to late fall.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> or smuts are found in high numbers from late May to late fall.</p>
<p class="p5">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->`,
    },
    {
      id: 10,
      name: 'Saskatchewan',
      html: `<p class="p1"><strong>Predominant Pollen in the Saskatoon, Saskatchewan region</strong></p>
<p class="p2">Due to extreme variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season ranges from late March to late June and the counts vary from low to moderate due to the number of species present.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">These groups of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Counts are mostly in the low to moderate ranges and the occasional high count, from mid-June to early October.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollination season can begin from late April to early May and can end mid-May to early June. The season can last at least three weeks and low to high counts are observed. Considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season varies a great deal from year to year due to the effect of weather. The start of the season can occur from late April to mid-May and end from the late May to late June. High counts are observed and they are considered significant allergens.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> can produce significant counts (from low to high counts) from mid-March to late July. May not be of significance in causing allergic reactions except in highly sensitized individuals.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. Low, moderate and high counts are observed. The season can last from two to four weeks depending on the year. The pollen season can start from early April to early May and can end from early to late May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce significant counts, usually in the moderate range, in June and July. The season can start from mid-May to early June and ends early October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> produce mostly low, with the occasional moderate, counts. The season can start from early April to early May and end late April to early May. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Linden &amp; Basswood (Tilia sp.)</strong></p>
<p class="p4"><span class="s1">Linden and basswood</span> season varies from year to year. The season can start from early to mid-July and end late July to early August. Some years hardly any pollen is produced whereas other years low and moderate counts are observed. May cause allergic reactions to those who are highly sensitized.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies from year to year due to the the effect of weather. Significant counts are observed during the season which can start mid-April to early May and end late May to late June. The season lasts approximately one month. There is also a short season in early June but this species is insect pollinated and very little pollen gets airborne.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugwort</span> season is from mid-July to mid-October. Low to moderate counts, and the occasional high counts, are observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles </span>and parietaria occur in significant numbers that may cause allergic reactions and are consdered important allergens. The season start is mid-June to early July and the season end is early September. The counts are in the low to moderate ranges.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from the third week of April to the thrid week of May and end late May to mid-June. The season is highly affected by weather. Mostly low, with the occasional moderate or high, counts observed. Oaks, depending on the species, are highly allergenic.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from early April to late April and the end of the season can be from early May to the end of May. Because of the extreme temperatures and weather conditions the season start and finish dates can vary by as much as a month. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">High counts are observed for <span class="s1">pine, fir and spruce</span>. The season can start from early to late May and can end early to late July. The season varies a great deal from year to year due to the effect of weather. This is a very important group for those who are sensitised.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season is from late July to early October. Most of the counts are low but the occasional moderate one is observed. Even at these levels ragweed can be significant in causing allergic reactions.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4">The main <span class="s1">sagebrush</span> season is from mid-July to mid-October. Low to moderate counts, and the occasional high counts, are observed.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4">The season for <span class="s1">willows</span> can start from mid-April to mid-May and end late May to mid-June. There is a great variation in the season from year to year due to weather. Not only the timing of the pollen season can vary but as well the pollen levels. Some years only low counts are observed and other years very high counts are obtained. Considered to be allergenic in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Spores in the Saskatoon, Saskatchewan region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from April to mid-October. The highest counts are observed from July to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season is very sporadic with some high counts observed. It may be of significance in causing allergic reactions. The season is from mid-June to end of September.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen and high counts are observed. The season is from mid-May to the end of September.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is from June to the end of September. The counts are sporadic and in the low to high ranges. Allergenic properties are unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round and very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some very high counts in July and August. The season is from mid-May to the end of September with significant counts. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. High counts can be observed from late March to mid-October. Not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are in the low to moderate range. This is a summer and fall spore, July to September. There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from the end of April to mid-October with low to high counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also known as powdery mildew, season is from April to mid-October. Low to high counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to the end of September with mostly low to moderate counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> also know as bracket fungus can produce high counts from June to the end of September. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September, producing moderate and high counts. The season is sporadic. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season is from late March to early October. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from late May to mid-October.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate and low counts are observed from April to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range, with some high counts observed, from late May to the end of September. Allergenic properties are unknown.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season occurs mostly from August to the end of September with moderate counts observed.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> also referred to as rusts do occur in high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from mid-May to early October and the counts are mostly low to moderate with some in the high range.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">The allergenic properties of <span class="s1">ustilaginales</span> a.k.a smuts are unknown. The season is from mid-May to mid-October with some very high counts.</p>
<p class="p1"><strong>Predominant Pollen in the Regina, Saskatchewan region</strong></p>
<p class="p6">Due to variations in the weather at this site, the tree pollen season fluctuates significantly from year to year. The pollen seasons described here try to cover the time when each can occur.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season starts from early to late April and ends late June. The counts are in the low to moderate range and may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">These groups of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Counts are in the low to moderate ranges, and the season can start early to mid-June and end early October.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can start the second week of April to the second week of April to the second week of May and end the third week of May to early June. Very high counts are observed. Can cause allergic reactions in sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4"><span class="s1">Birch</span> season varies slightly from year to year due to the effect of weather. The season can start from the third week of April to the first week of May and end late May to late June. The amount of pollen observed varies from year to year. Low and moderate counts are observed depending on the year.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers and yews</span> can produce significant counts, from low to high. The season can start the end of March to the third week of April and end early to late June. Most species in Canada are not considered to be significant in causing allergic reactions.</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> can be important allergens. Low to high counts are observed and the season can last three to four weeks. The pollen season can start mid-April to early May and end early to late May.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grass</span> season starts from the second week of May to early June and ends late September to early October. Low, moderate and occasional high counts are observed.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies from year to year due to the the effect of weather. A small early season with sporadic counts can occur from mid-April to early May. The main season, which can be more stable, can start from late April to the second week of May and end the third week of May to early June. The counts do get very high and some species are known to cause allergic reactions. The season lasts approximately one month.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugwort</span> season starts from early to mid-July and ends well into October. Low to moderate counts are observed. They may cause allergic reactions in highly sensitized individuals.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria produce mostly low, with the occasional moderate, counts and the season can start from the second to the third week of June and end early September. They are considered important allergens due to their small size.</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from the third week of April to the third week of May and end late May to late June. The season is highly affected by weather. Mostly low, with the occasional moderate or high, counts are observed. Oaks, depending on the species, are allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">The season for <span class="s1">spruce, fir and pine trees</span> can start from the first to the third week of May and end early to late July. Mostly low to moderate, with occational high, counts are observed. The season varies a great deal from year to year due to the effect of weather. This group is very important for those who are sensitised.</p>
<p class="p3"><strong>Plantains (Plantago sp.)</strong></p>
<p class="p4"><span class="s1">Plantain</span> counts are always low but even at these levels allergic reactions can occur in highly sensitized individuals. The season starts from late May to early June and ends late August.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start late March to the third week of April and end the second week of May to early June. Because of the effect of weather, the season can vary by approximately three weeks. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season can start from late June to early August and end in October with a heavy frost. Occasional moderate counts are observed.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrush</span> season starts from early to mid-July and ends well into October. Low to moderate counts are observed. They may cause allergic reactions in highly sensitised individuals.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4">The season for <span class="s1">willows</span> can start from mid-April to early May and end between late May to mid-June. There is a great variation in the season from year to year due to weather, and low to moderate counts are observed. Considered to be allergenic in highly sensitized individuals.</p>
<p class="p1"><strong>Predominant Spores in the Regina, Saskatchewan region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from April to mid-October. The highest counts occur from July to early October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> season for this spore is very sporadic with the occasional moderate counts observed. It may not be of significance in causing allergic reactions at these levels. The season, with moderate counts, is mostly in August.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen and high counts are observed. The season is from mid-May to the end of September.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is from June to the end of September. The counts are sporadic and in the low to high ranges. Allergenic properties are unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round and very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus</span> mushroom can produce some high counts from June to August. The season is from late May to early October, with significant counts. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae sp.</span> counts are sporadic throughout the whole counting season. High counts can be observed from April to early October. They are not known to cause allergic reactions.</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts for drechslera are in the low to moderate range. This is a summer and fall spore (July to September). There are other related genera, which are also found in air samples, that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4">Some species of <span class="s1">epicoccum</span> are known to cause allergic reactions. The season is from the end of April to mid-October with low to high counts.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, season is from April to mid-October. Low to high counts are observed.</p>
<p class="p5">&nbsp;</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to the end of September with mostly low to moderate counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span>, also known as bracket fungus, can produce moderate counts from July to early October. It is considered an important allergen.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> season is from May to the end of September, producing moderate and high counts. The season is sporadic. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4">The season for <span class="s1">Leptosphaeria</span> is from late March to early October. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from late May to mid-October.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Moderate and low counts are observed from April to mid-October.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> spores are found throughout the whole counting season and are probably present in significant numbers beyond that. High counts are observed from March to late fall. May be considered important allergens.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season is mostly in the low to moderate range, with some high counts observed, from late May to the end of September. Allergenic properties are unknown.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season occurs mostly from August to the end of September with moderate counts observed.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p7"><span class="s1">Uredinales</span>, also know as rusts, do occur in high numbers but not enough is known about their significance in causing allergic reactions at these levels. The season is from July to early October and the counts are mostly low to moderate with some in the high range.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4">Allergenic properties of <span class="s1">ustilaginales</span> a.k.a smuts are unknown. The season is from late May to early October with some very high counts.</p>
<p class="p1"><strong>Predominant Pollen in the Prince Albert, Saskatchewan region</strong></p>
<p class="p2">Tree pollen seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.</p>
<p class="p3"><strong>Alder (Alnus sp.)</strong></p>
<p class="p4"><span class="s1">Alder</span> season can start from late March to mid-Apri and end mid to late June. The counts vary mostly from low to moderate with the occasional high. The alder season is highly sensitive to weather conditions. The highest counts occur from april to mid-June. They are usually considered important allergens.</p>
<p class="p3"><strong>Amaranthaceae &amp; Chenopodiaceae</strong></p>
<p class="p4">This group of weeds are similar microscopically and are not differentiated. They include some weeds which are considered allergenic. Low and moderate counts are observed from mid-June to late September.</p>
<p class="p3"><strong>Ash (Fraxinus sp.)</strong></p>
<p class="p4"><span class="s1">Ash</span> pollen season can start from late April to mid-May and end late May to early June. Some years very high counts are observed but the season varies from year to yearin timing, season length and pollen levels. This is partially due to weather. Considered to be allergenic only in highly sensitized individuals.</p>
<p class="p3"><strong>Birch (Betula sp.)</strong></p>
<p class="p4">The start and end of the <span class="s1">birch</span> season can vary by as much as a month which is due to the effect of weather. The start of the season can occur from late April to mid-May and the end can occur from late May to late June. The counts can get in the high range.</p>
<p class="p3"><strong>Cedars, Junipers and Yew (Cupressaceae family)</strong></p>
<p class="p4"><span class="s1">Cedars, junipers, and yews</span> produce significant counts, mostly in the moderate range, with a few high counts. The season can start late March to mid-April and end late May to mid-June. Some high counts are observed. There is great fluctuation in the season due to the effect of weather. Probably of no significance in causing allergic reactions.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Elm (Ulmus sp.)</strong></p>
<p class="p4"><span class="s1">Elm</span> are important allergens. The season can start from early April to early May and end late April to late May. There is a large fluctuation from year to year for the season length, timing of the season and the amount of pollen produced. This is partially due to the effect of weather.</p>
<p class="p3"><strong>Grasses (Gramineae family)</strong></p>
<p class="p4"><span class="s1">Grasses</span> produce significant counts, usually in the low and moderate ranges with the occasional high counts in June and July. The main season can start from mid to late May and end early to mid-October.</p>
<p class="p3"><strong>Hazel (Corylus sp.)</strong></p>
<p class="p4"><span class="s1">Hazelnuts</span> produce low and moderate counts. The season can start from the second week of April to the second week of May and end mid to late May. The counts can be in the low to moderate range. May cause allergic reactions in individuals who are highly sensitized.</p>
<p class="p3"><strong>Maple (Acer sp.)</strong></p>
<p class="p4"><span class="s1">Maple</span> season varies greatly which is mostly due to the effect of weather. Not only does the season start and end vary but the amount of pollen produced as well as the season length. The season can start from late April to mid-May and end mid to the end of May. Most years the counts are low and moderate. Occasionally a high count is observed.</p>
<p class="p3"><strong>Mugwort (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Mugwort</span> season is from mid-July to mid-October with low and moderate counts observed. Certain species are considered highly allergenic.</p>
<p class="p3"><strong>Mustard &amp; Cabbage</strong></p>
<p class="p4">The mustard and cabbage family are responsible for contact dermatitis and food allergies. They are not considered important in airborne allergies since they are mostly insect pollinated but a significant amount of pollen is observed in our samples at this location. The season can start around late June and lasts until mid-September. Mostly low, with the occasional moderate, counts are observed.</p>
<p class="p3"><strong>Nettles (Urticaceae sp.)</strong></p>
<p class="p4"><span class="s1">Nettles</span> and parietaria occur in significant numbers that may cause allergic reactions. The season is from mid-June to early September and the counts are in the low and moderate ranges.</p>
<p class="p5">&nbsp;</p>
<p class="p3"><strong>Oak (Quercus sp.)</strong></p>
<p class="p4"><span class="s1">Oak</span> season can start from late April to the third week of May and end early to mid-June. Mostly low, with the occasional moderate, counts are observed. The timing of the season as well as to how much pollen is produced can vary a lot from year to year partially due to the effect of weather. Oaks are highly allergenic.</p>
<p class="p3"><strong>Pine, fir and spruce (Pinaceae family)</strong></p>
<p class="p4">Very high counts are observed for <span class="s1">pine, fir and spruce</span>. The season can start early May to the third week of May and end mid to late July. There can almost be a month difference as to when the season can occur from year to year which is partially due to weather. This group is very important to those individuals who are sensitized.</p>
<p class="p3"><strong>Poplar, cottonwood and aspen (Populus sp.)</strong></p>
<p class="p4"><span class="s1">Poplar, cottonwood and aspen</span> season can start from early April to the end of April and end from early to late May. Some of the counts are very high and may cause allergic reactions.</p>
<p class="p3"><strong>Ragweed (Ambrosia sp.)</strong></p>
<p class="p4"><span class="s1">Ragweed</span> season is from late July to early October with only low counts observed.</p>
<p class="p3"><strong>Sagebrush (Artemisia sp.)</strong></p>
<p class="p4"><span class="s1">Sagebrush</span> season is from mid-July to mid-October with low and moderate counts observed. Certain species are considered highly allergenic.</p>
<p class="p3"><strong>Willow (Salix sp.)</strong></p>
<p class="p4"><span class="s1">Willows</span> pollen season can start from mid-April to early May and end early to late June. There is a great variation in the season from year to year not only in when the season occurs but the amount of pollen produced. Some years very high counts are observed. Considered to cause allergic reactions in individuals who are sensitized.</p>
<p class="p1"><strong>Predominant Spores in the Prince Albert, Saskatchewan region</strong></p>
<p class="p2">Spore seasons fluctuate from year to year by as much as two to four weeks at this site due to the effect of weather. Spores described here are generalizations as to when sporulation occurs.</p>
<p class="p3"><strong>Alternaria sp.</strong></p>
<p class="p4"><span class="s1">Alternaria</span> counts do get high and some species are known to cause allergic reactions. The season is from May to mid-October.</p>
<p class="p3"><strong>Aspergillus sp.</strong></p>
<p class="p4"><span class="s1">Aspergillus</span> are found throughout the whole counting season and are probably present in significant numbers beyond that. Significant counts are observed from late March to late fall.</p>
<p class="p3"><strong>Boletus sp.</strong></p>
<p class="p4"><span class="s1">Boletus</span> counts are sometimes very sporadic with some high counts observed. It may be of significance in causing allergic reactions. The season is from mid-June to the end of September.</p>
<p class="p3"><strong>Botrytis sp.</strong></p>
<p class="p4"><span class="s1">Botrytis</span> may be a significant allergen, and high counts are observed. The season is sporadic from late April to early October.</p>
<p class="p3"><strong>Caloplaca sp.</strong></p>
<p class="p4">The season is sporadic from late March to early October. Allergenic properties are unknown.</p>
<p class="p3"><strong>Cladosporium sp.</strong></p>
<p class="p4"><span class="s1">Cladosporium</span> is the most abundant spore found throughout the whole season. Some species are known to cause allergic reactions. This spore exists all year round but very high counts are known to occur from March to well into late fall.</p>
<p class="p3"><strong>Coprinus sp.</strong></p>
<p class="p4"><span class="s1">Coprinus sp.</span> can produce some very high counts from late May to mid-October. It is considered an important allergen.</p>
<p class="p3"><strong>Diatrypaceae sp.</strong></p>
<p class="p4"><span class="s1">Diatrypaceae</span> counts are sporadic throughout the whole counting season. Very high counts can be observed from late March to mid-October. Not known to cause allergic reactions</p>
<p class="p3"><strong>Drechslera sp.</strong></p>
<p class="p4">The counts are mostly in the low range. This is a late summer and fall spore, July to early October. There are other related genera, which are also found in air samples that can cause respiratory problems. One example is <em>Bipolaris sp.</em></p>
<p class="p3"><strong>Epicoccum sp.</strong></p>
<p class="p4"><span class="s1">Epicoccum</span> species are known to cause allergic reactions. The season is from the end of April to mid-October with low and moderate counts observed.</p>
<p class="p3"><strong>Erysiphe (Oospora) sp.</strong></p>
<p class="p4"><span class="s1">Erysiphe</span>, also know as powdery mildew, main season is from late April to mid-October. Low to high counts are observed.</p>
<p class="p3"><strong>Fusarium sp.</strong></p>
<p class="p4"><span class="s1">Fusarium</span> counts are very sporadic throughout the whole counting season. The majority of the season occurs from May to the end of September with low and moderate counts.</p>
<p class="p3"><strong>Ganoderma sp.</strong></p>
<p class="p4"><span class="s1">Ganoderma</span> also known as bracket fungus can produce high counts from mid-June to early October. It is considered an important allergen.</p>
<p class="p3"><strong>Helicomyces sp.</strong></p>
<p class="p4"><span class="s1">Helicomyces</span> season is from May to the end of September producing low to very high counts. The season is very sporadic. Allergenic properties are unknown.</p>
<p class="p3"><strong>Leptosphaeria sp.</strong></p>
<p class="p4"><span class="s1">Leptosphaeria</span> season starts early April and ends mid-October. The counts vary from day to day, which is probably due to the effect of weather. Very high counts are observed from July to mid-October. This group is important for those individuals who are sensitized.</p>
<p class="p3"><strong>Myxomycetes</strong></p>
<p class="p4">Low and moderate counts are observed from late March to mid-October. Some moderate and high counts are observed.</p>
<p class="p3"><strong>Penicillium sp.</strong></p>
<p class="p4"><span class="s1">Penicillium</span> are found throughout the whole counting season and are probably present in significant numbers beyond that. Significant counts are observed from late March to late fall.</p>
<p class="p3"><strong>Pithomyces sp.</strong></p>
<p class="p4"><span class="s1">Pithomyces</span> season produces low to moderate counts, with a few high counts observed, from mid-June to the end of September. Allergenic properties are unknown.</p>
<p class="p3"><strong>Stemphylium sp.</strong></p>
<p class="p4">The season occurs mostly from July to the end of September with occasional moderate counts observed.</p>
<p class="p3"><strong>Uredinales sp.</strong></p>
<p class="p4"><span class="s1">Uredinales</span> aka rusts do occur in high numbers but not enough is known about their significance in causing allergic reactions. The main season is from late May to mid-October.</p>
<p class="p3"><strong>Ustilaginales sp.</strong></p>
<p class="p4"><span class="s1">Ustilaginales</span> commonly referred to as smuts can reach high counts, but allergenic properties are unknown. The season is from mid-April to mid-October with some very high counts.</p>
<p class="p8">&nbsp;</p>
<!-- Comments are visible in the HTML source only -->`,
      bottom: true,
    },
  ];

  const regex = /<br|\n|\r\s*\\?>/g;

  const contentWidth = Dimensions.get('window').width;


  return (
    <View style={{padding: 20}}>
      <AppHeader heading="Pollen Information for Canada" goBack={true} />

      <AppText
        title={
          'Tree pollen seasons fluctuate from year to year by as much as two to six weeks due to the effect of weather. The pollen seasons described here are generalizations as to when pollination occurs.'
        }
        textColor={AppColors.LIGHTGRAY}
        textSize={1.8}
      />

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
        <FlatList
          data={pollens}
          contentContainerStyle={{marginTop: 20}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (index == isIndex) {
                    setIndex();
                  } else {
                    setIndex(index);
                  }
                }}
                activeOpacity={0.5}
                style={{
                  borderWidth: 1,
                  borderTopRightRadius: item.top ? 10 : 0,
                  borderTopLeftRadius: item.top ? 10 : 0,
                  borderBottomRightRadius: item.bottom ? 10 : 0,
                  borderBottomLeftRadius: item.bottom ? 10 : 0,
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: item.bottom ? 1 : 0,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: responsiveWidth(80),
                  }}>
                  <AppText
                    title={item.name}
                    textSize={2}
                    textColor={AppColors.BLACK}
                    textFontWeight
                  />
                  <TouchableOpacity>
                    <AntDesign
                      name={'plus'}
                      size={responsiveFontSize(2.5)}
                      color={AppColors.BLUE}
                    />
                  </TouchableOpacity>
                </View>
                {index == isIndex ? (
                  <>
                    {item?.html && <HTMLView value={item.html.trim().replace(regex, '')} contentWidth={contentWidth}  />}
                  </>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default PollenInfoForCad;

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
