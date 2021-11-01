import React, { useContext, useState } from "react";
import { SharedInputTemplate, ProfileImageUpload } from "../../shared-component/sharedInputTemplate";
import { BuilderContext } from "../../../context/BuilderProvider"
const ProfileTab = () => {
  const { inputChangeHandler, imageUploadHandler, resumeContentState } = useContext(BuilderContext);
  const [uploadImage, setUploadImage] = useState()
  console.log("what is file",uploadImage)
  return (
    <div>
      <ProfileImageUpload 
        onChangeHandler={files =>setUploadImage(files) }
        uploadImage={uploadImage}
        imageUploadHandler={imageUploadHandler}
      />
    <SharedInputTemplate
      onInputChange={value =>
        inputChangeHandler("data.profile.firstName", value)
      }
      labelName="First Name"
    />
    <SharedInputTemplate
    onInputChange={value =>
      inputChangeHandler("data.profile.lastName", value)
    }
    labelName="Last Name"
  />
  </div>
  );
};
export default ProfileTab;
 