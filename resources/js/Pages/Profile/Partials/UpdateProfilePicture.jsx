import PrimaryButton from "@/Components/PrimaryButton";
import { Input } from "@/Components/ui/input";
import { User2Icon } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";

export default function UpdateProfilePicture({user}) {
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(user.profile || null);

    const { data, setData, post, processing } = useForm({
        name: user.name,
        email: user.email,
        profile_picture: null,  // Para sa pag-upload ng bagong image
    });

    // Handle File Selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setData("profile_picture", file);
        }
    };

    // Handle Form Submit
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.profile_picture) {
            formData.append("profile_picture", data.profile_picture);
        }

        post(route("profile.updatePicture"), formData);
    };

    return (
        <div className="pl-3">
            <h1 className="text-lg font-medium">Profile Picture</h1>
            <p className="text-sm text-zinc-600 mb-5">
                Update your account's profile picture.
            </p>

            <form onSubmit={submit}>
                <div className="flex gap-3">
                    {/* Profile Image Container */}
                    <div
                        className="w-[7rem] h-[7rem] bg-zinc-200 rounded-full flex justify-center items-center overflow-hidden cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User2Icon className="w-[6rem] h-[6rem] text-gray-500" />
                        )}
                    </div>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>

                {/* Save Button */}
                <PrimaryButton className="mt-5 ml-5" disabled={processing}>
                    {processing ? "Saving..." : "Save"}
                </PrimaryButton>
            </form>
        </div>
    );
}
