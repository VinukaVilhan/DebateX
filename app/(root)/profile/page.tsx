"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
  User,
} from "firebase/auth";
import NavbarDashboard from "@/components/NavbarDashboard";
import { useRouter } from "next/navigation";
import { auth, storage } from "../../../lib/firebase/config"; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "../../../components/ui/Modal"; // Assuming Modal component is defined and exported

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNameSuccessModal, setShowNameSuccessModal] = useState(false);
  const [showNameErrorModal, setShowNameErrorModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] =
    useState(false);
  const [showPasswordErrorModal, setShowPasswordErrorModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (user.photoURL) {
          setProfileImageUrl(user.photoURL);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
    } else {
      setName("");
    }
  }, [user]);

  const deleteCurrentUser = () => {
    deleteUser(auth.currentUser!)
      .then(() => {
        console.log("Account Deleted");
        setShowDeleteSuccessModal(true);
        setShowDeleteErrorModal(false);

        setTimeout(() => {
          setShowDeleteSuccessModal(false);
          router.push("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        setDeleteError(error.message);
        setShowDeleteErrorModal(true);
      });
  };

  const changeUsername = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowNameSuccessModal(false);
    setShowNameErrorModal(false);

    await updateProfile(auth.currentUser!, { displayName: name })
      .then(() => {
        setShowNameSuccessModal(true);
      })
      .catch((error) => {
        console.log(error);
        setNameError(error.message);
        setShowNameErrorModal(true);
      });
  };

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPasswordErrorModal(false);
    setShowPasswordSuccessModal(false);
    await updatePassword(auth.currentUser!, newPassword)
      .then(() => {
        setShowPasswordSuccessModal(true);
        sendPasswordResetEmail(auth, user!.email!)
          .then(() => {
            // Password reset email sent!
          })
          .catch((error) => {
            setPasswordError(error.message);
            setShowPasswordErrorModal(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setPasswordError(error.message);
        setShowPasswordErrorModal(true);
      });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `profile_images/${auth.currentUser!.uid}`);
  
      // Upload the new image
      uploadBytes(storageRef, file).then(() => {
        // Get the download URL
        getDownloadURL(storageRef).then((url) => {
          // Update profile with new URL
          updateProfile(auth.currentUser!, { photoURL: url }).then(() => {
            setProfileImageUrl(url);
          });
        });
      }).catch((error) => {
        console.error("Error uploading image:", error);
      });
    } else {
      // If no file is selected, revert to Google profile image
      const googleProfileImageUrl = user?.photoURL || "";
      updateProfile(auth.currentUser!, { photoURL: googleProfileImageUrl }).then(() => {
        setProfileImageUrl(googleProfileImageUrl);
      }).catch((error) => {
        console.error("Error updating profile image:", error);
      });
    }
  };
  
  

  return (
    <>
    <NavbarDashboard/>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container w-75 mx-auto shadow-lg pt-9">
          <h1
            style={{ textAlign: "center", color: "purple" }}
            className="mx-auto mt-5 pt-5"
          >
            Hi {user ? `${user.displayName}!!` : "user"}
            <br />
            <span style={{ color: "black" }}>Edit Your Profile</span>
          </h1>
          <form onSubmit={changeUsername}>
            <div className="form-group mt-5 mb-3 mx-auto w-50">
              <input
                type="text"
                value={name}
                placeholder="Change username"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="submit"
                value="Change Username"
                className="btn mt-2"
                style={{
                  backgroundColor: "purple",
                  border: "none",
                  color: "white",
                }}
              />
            </div>
          </form>
          <form onSubmit={changePassword}>
            <div className="form-group mt-5 mb-3 mx-auto w-50">
              <input
                type="password"
                value={newPassword}
                placeholder="Change password"
                className="form-control"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="submit"
                value="Change Password"
                className="btn mt-2 mb-3"
                style={{
                  backgroundColor: "purple",
                  border: "none",
                  color: "white",
                }}
              />
            </div>
          </form>
          <div className="form-group mt-5 mb-3 mx-auto w-50">
            <label>Upload Profile Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageUpload}
            />
            {profileImageUrl && (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="mt-3"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}
          </div>
          <div className="form-group mt-5 mb-2 mx-auto w-50">
            <button className="btn btn-danger mb-5" onClick={deleteCurrentUser}>
              Delete Account
            </button>
          </div>
        </div>
      )}

      <Modal
        show={showNameSuccessModal}
        onHide={() => setShowNameSuccessModal(false)}
        message="Username successfully updated"
        success="1"
        button="Close"
      />

      <Modal
        show={showNameErrorModal}
        onHide={() => setShowNameErrorModal(false)}
        message={nameError}
        success="0"
        button="Close"
      />

      <Modal
        show={showPasswordSuccessModal}
        onHide={() => setShowPasswordSuccessModal(false)}
        message="Password Changed Successfully"
        success="1"
        button="Close"
      />

      <Modal
        show={showPasswordErrorModal}
        onHide={() => setShowPasswordErrorModal(false)}
        message={passwordError}
        success="0"
        button="Close"
      />

      <Modal
        show={showDeleteSuccessModal}
        onHide={() => setShowDeleteSuccessModal(false)}
        message="Account Deleted Successfully"
        success="1"
        button="Close"
      />

      <Modal
        show={showDeleteErrorModal}
        onHide={() => setShowDeleteErrorModal(false)}
        message={deleteError}
        success="0"
        button="Close"
      />
    </>
  );
};

export default Profile;
