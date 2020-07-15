import React from "react";

function ProfilePic({ image, toggleModal }) {
    image = image || "/img/profil.png";
    return (
        <div className="profile-img-container">
            <img className="profile-img" src={image} onClick={toggleModal} />
        </div>
    );
}

export default ProfilePic;

//fim
