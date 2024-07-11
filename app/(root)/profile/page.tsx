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
import { useRouter } from "next/navigation";
import { auth, storage } from "../../../lib/firebase/config"; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "../../../components/ui/Modal"; // Assuming Modal component is defined and exported
import Image from "next/image";

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
      uploadBytes(storageRef, file)
        .then(() => {
          // Get the download URL
          getDownloadURL(storageRef).then((url) => {
            // Update profile with new URL
            updateProfile(auth.currentUser!, { photoURL: url }).then(() => {
              setProfileImageUrl(url);
            });
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      // If no file is selected, revert to Google profile image
      const googleProfileImageUrl = user?.photoURL || "";
      updateProfile(auth.currentUser!, { photoURL: googleProfileImageUrl })
        .then(() => {
          setProfileImageUrl(googleProfileImageUrl);
        })
        .catch((error) => {
          console.error("Error updating profile image:", error);
        });
    }
  };

  return (
    <div className="m-9">
    {loading ? (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      ) : (
        <div className=" bg-white shadow-lg rounded-lg p-10">
          <h1 className="text-center text-purple-600 text-3xl mb-6">
            Hi {user ? `${user.displayName}!!` : "user"}
            <br />
            <span className="text-black">Edit Your Profile</span>
          </h1>
          <form onSubmit={changeUsername} className="space-y-4">
            <div className="form-group">
              <input
                type="text"
                value={name}
                placeholder="Change username"
                className="w-full p-2 border rounded"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="submit"
                value="Change Username"
                className="w-full mt-2 p-2 bg-purple-600 text-white rounded cursor-pointer"
              />
            </div>
          </form>
          <form onSubmit={changePassword} className="space-y-4 mt-6">
            <div className="form-group">
              <input
                type="password"
                value={newPassword}
                placeholder="Change password"
                className="w-full p-2 border rounded"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="submit"
                value="Change Password"
                className="w-full mt-2 p-2 bg-purple-600 text-white rounded cursor-pointer"
              />
            </div>
          </form>
          <div className="form-group mt-6">
            <label className="block mb-2">Upload Profile Image</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={handleImageUpload}
            />
            {profileImageUrl && (
              <Image
                src={profileImageUrl}
                width={30}
                height={30}
                alt="Profile"
                className="mt-3 w-24 h-24 rounded-full"
              />
            )}
          </div>
          <div className="form-group mt-6">
            <button
              className="w-full p-2 bg-red-600 text-white rounded cursor-pointer"
              onClick={deleteCurrentUser}
            >
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
    </div>
 
  );
};

export default Profile;
