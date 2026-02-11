import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { updateProfile } from "../service/user";
import { addUser } from "../store/slices/userSlice";
import { useNotification } from "../context/NotificationContext";
import { genderBadgeClass, genderLabel } from "../utils/utils";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.currentUser);
  const { showAlert } = useNotification();
  const [hobbyInput, setHobbyInput] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    hobbies: user?.hobbies || [],
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
      hobbies: formData.hobbies || [],
      about: formData.about?.trim() || undefined,
      photo: formData.photo || undefined,
    };

    const res = await updateProfile(payload);
    console.log(res);
    if (res?.code === 200) {
      dispatch(addUser(res.data));
      showAlert(res?.message || "Profile updated", "success");
    } else {
      showAlert(res?.message || "Profile update failed", "error");
    }
  };

  if (!user) return null;

  return (
    <div className="flex justify-center mt-2 mb-2">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-2">
                <img loading="lazy" src={user.photo} alt="profile" />
              </div>
            </div>

            {/* Name + meta */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {formData.firstName} {formData.lastName}
              </h2>

              <p className="text-sm text-gray-400">{user.emailId}</p>

              <p className="text-xs text-gray-500 mt-0.5">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </p>

              {/* Live chips */}
              <div className="flex gap-2 flex-wrap mt-3">
                {formData.age && (
                  <span className="badge badge-ghost">{formData.age} yrs</span>
                )}

                {formData.gender && (
                  <span
                    className={`badge ${genderBadgeClass(formData?.gender)} capitalize`}
                  >
                    {genderLabel(formData?.gender)}
                  </span>
                )}

                {formData.hobbies?.slice(0, 3).map((hobby: string) => (
                  <span key={hobby} className="badge badge-outline">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="divider" />
          {/* EDITABLE DETAILS SECTION */}
          <div className="mt-2 space-y-6">
            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  className="input input-bordered w-full mt-1"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  className="select select-bordered w-full mt-1"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="lgbtq">LGBTQ</option>
                </select>
              </div>
            </div>

            {/* Hobbies – Chip Input */}
            <div>
              <label className="text-sm font-medium">Interests</label>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData?.hobbies?.map((hobby: string) => (
                  <span
                    key={hobby}
                    className="badge badge-outline cursor-pointer"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hobbies: prev.hobbies?.filter(
                          (h: string) => h !== hobby,
                        ),
                      }))
                    }
                  >
                    {hobby} ✕
                  </span>
                ))}
              </div>

              {/* Input */}
              <input
                className="input input-bordered w-full mt-2"
                placeholder="Type your interest and press Enter"
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    hobbyInput.trim() &&
                    !formData.hobbies.includes(hobbyInput.trim())
                  ) {
                    e.preventDefault();
                    setFormData((prev) => ({
                      ...prev,
                      hobbies: [...prev.hobbies, hobbyInput.trim()],
                    }));
                    setHobbyInput("");
                  }
                }}
              />
            </div>

            {/* About – Auto-growing */}
            <div>
              <label className="text-sm font-medium">About</label>
              <textarea
                name="about"
                className="textarea textarea-bordered w-full mt-1 resize-none overflow-hidden"
                value={formData.about}
                placeholder="Tell something about yourself"
                onChange={(e) => {
                  handleChange(e);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button className="btn btn-primary w-full" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
