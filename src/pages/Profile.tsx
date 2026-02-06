import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { updateProfile } from "../service/user";
import { addUser } from "../store/slices/userSlice";
import { useNotification } from "../context/NotificationContext";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.currentUser);
  const [isEdit, setIsEdit] = useState(false);
  const { showAlert } = useNotification();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    hobbies: user?.hobbies?.join(", ") || "",
    about: user?.about || "",
    photo: user?.photo || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const payload = {
      age: formData.age ? Number(formData.age) : undefined,
      gender: formData.gender || undefined,
      hobbies: formData.hobbies
        ? formData.hobbies
            .split(",")
            .map((h: string) => h.trim())
            .filter(Boolean)
        : undefined,
      about: formData.about?.trim() || undefined,
      photo: formData.photo || undefined,
    };

    const res = await updateProfile(payload);
    console.log(res);
    if (res?.code === 200) {
      dispatch(addUser(res.data));
      setIsEdit(false);
      showAlert(res?.message || "Profile updated", "success");
    } else {
      showAlert(res?.message || "Profile update failed", "error");
    }
  };

  if (!user) return null;

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img loading="lazy" src={user.photo} alt="profile" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="opacity-60">{user.emailId}</p>
            </div>
          </div>

          <div className="divider" />

          {/* VIEW MODE */}
          {!isEdit && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="stats shadow w-full">
                <div className="stat">
                  <div className="stat-title">Age</div>
                  <div className="stat-value text-primary">
                    {user.age || "-"}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Gender</div>
                  <div className="stat-value capitalize">
                    {user.gender || "-"}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Member Since</div>
                  <div className="stat-value text-sm">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Hobbies */}
              <div>
                <h3 className="font-semibold mb-2">Hobbies</h3>
                {user.hobbies?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {user.hobbies.map((hobby) => (
                      <span
                        key={hobby}
                        className="badge badge-outline badge-lg"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="opacity-50 text-sm">No hobbies added</p>
                )}
              </div>

              {/* About */}
              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold mb-1">About</h3>
                <p className="opacity-80">
                  {user.about || "No description added yet."}
                </p>
              </div>

              {/* Action */}
              <button
                className="btn btn-primary w-full"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
            </div>
          )}

          {/* EDIT MODE */}
          {isEdit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="input input-bordered"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  className="input input-bordered"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>

              <input
                type="number"
                className="input input-bordered w-full"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
              />

              <select
                className="select select-bordered w-full"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="lgbtq">LGBTQ</option>
              </select>

              <input
                className="input input-bordered w-full"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="Hobbies (comma separated)"
              />

              <textarea
                className="textarea textarea-bordered w-full"
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="About you"
              />

              <div className="flex justify-end gap-3">
                <button
                  className="btn btn-outline"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
