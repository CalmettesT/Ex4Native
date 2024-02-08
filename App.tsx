import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from './Client';


const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestGalleryPermission = async () => {
    // if (Platform.OS === 'android') {
    //   const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    //   console.log(result);
    //   if (result === PermissionsAndroid.RESULTS.GRANTED) { //PermissionsAndroid.RESULTS.GARANTED ne marche pas
    //     console.log('Permission accordée');
    //     selectImage();
    //   } else {
    //     console.log("Permission refusée, vous ne pouvez pas utiliser l'application sans accepter");
    //   }
    // }
    selectImage();
    }
    
    const selectImage = () => {
      launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri) { // S'assure que `uri` n'est pas `undefined`
            console.log('Image selected: ', uri);
            setImageUri(uri); // `uri` est garanti d'être une string ici
          } else {
            setImageUri(null); // Cas où `uri` est `undefined`
            console.log("Image non sélectionné");
          }
        }
      });
    };
    

  const handleUploadImage = async () => {
    if (imageUri) {
      const response = await uploadImage(imageUri);
      console.log(response);
    }
  };

  return (
    <View>
      <Button title="Sélectionner une Image" onPress={requestGalleryPermission} />
      <Button title="Envoyer sur Imgur" onPress={handleUploadImage} />
    </View>
  );
};

export default App;