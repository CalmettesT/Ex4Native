const IMGUR_CLIENT_ID = '345cde336208da8';

export const uploadImage = async (imageUri: string) => {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });

  try {

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Image uploaded to Imgur: ', result.data.link);
      return result.data.link;
    } else {
      console.log('Upload failed');
    }
    
  } catch (error) {
    console.error('Upload failed: ', error);
  }
};
