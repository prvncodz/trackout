import axios from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"


async function handleAvatarUpload(avatar: FormDataEntryValue) {
    const res = await axios.put(
        "/user/update-avatar",
        { avatar },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )
    return res.data
}
export function useUpdateAvatar() {
    return useMutation({
        mutationFn: (avatar: FormDataEntryValue) => handleAvatarUpload(avatar)
    })
}

interface handleUpdateUserInfoProps {
    fullname: FormDataEntryValue | null; email: FormDataEntryValue | null; height: FormDataEntryValue | null; weight: FormDataEntryValue | null;
}
async function handleUpdateUserInfo({ fullname, email, height, weight }: handleUpdateUserInfoProps) {
    const res = await axios.patch("/user/update-info", {
        fullname,
        email,
        height,
        weight,
    })
    return res.data
}
export function useUpdateUserinfo() {
    return useMutation({
        mutationFn: ({ fullname, email, height, weight }: handleUpdateUserInfoProps) => handleUpdateUserInfo({ fullname, email, height, weight })
    })

}

