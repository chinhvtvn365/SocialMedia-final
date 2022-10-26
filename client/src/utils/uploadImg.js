// upload hình ảnh lên server
const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "uqwl8vpz");
    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/chinhvu/image/upload/",
        {
          method: "POST",
          body: formData,
        }
      );
      const dataImg = await res.json();
      return dataImg.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

export default uploadImage