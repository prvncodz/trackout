import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import MyButton from "@/components/ui/MyButton"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/stores/user.store"
import { useState } from "react"
import { toast } from "sonner"
import { useUpdateAvatar, useUpdateUserinfo } from "@/hooks/useUser"

export default function ProfileCard() {
    const user = useAuth((s) => s.user)
    const [isOpen, setIsOpen] = useState(false)
    const [isInfoChanged, setIsInfoChanged] = useState(false)

    const stats = [
        { label: "Height", value: user?.height ? `${user?.height}cm` : "—" },
        { label: "Weight", value: user?.weight ? `${user?.weight}kg` : "—" },
    ]
    const { mutate: updateAvatar } = useUpdateAvatar()
    const { mutate: updateUserInfo } = useUpdateUserinfo()

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.target)
        const avatar = form.get("avatar")
        const info = {
            fullname: form.get("fullname"),
            email: form.get("email"),
            height: form.get("height"),
            weight: form.get("weight"),
        }
        try {
            if (avatar && avatar instanceof File && avatar?.size > 0) {
                console.log(typeof avatar)
                console.log(avatar)
                updateAvatar(avatar)
            }
            if (isInfoChanged) {
                updateUserInfo(info)
            }
            toast.success("Profile updated successfully")
        } catch (error: any) {
            const message = error?.message || "Something went wrong. Please try again."
            toast.error(message)
        }
        e.target.reset()
        setIsOpen(false)
        setIsInfoChanged(false)
    }

    return (
        <div className="relative flex h-auto w-full flex-col items-center justify-start gap-10 lg:mt-10 lg:flex-row">
            <div className="shadow-standard size-60 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                <img src={user?.avatar?.url} className="cursor-default" />
            </div>
            <div>
                <h2 className="cursor-default text-center text-xl font-semibold text-neutral-700 lg:text-left">
                    {user?.fullname ?? "User fullname"}
                </h2>
                <p className="cursor-default text-center text-base text-neutral-500 lg:text-left">
                    {user?.email ?? "example@abc.com"}
                </p>
                <div className="no-scrollbar mt-8 flex w-screen gap-3 overflow-auto scroll-smooth px-4 py-2 md:w-full md:justify-center lg:w-auto lg:px-0">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="border-line-color/50 flex w-fit min-w-50 flex-col gap-3 rounded-xl border bg-gray-50 p-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-muted-foreground cursor-default text-xs font-medium tracking-wider uppercase">
                                    {stat.label}
                                </p>
                            </div>

                            <div className="flex cursor-default items-baseline gap-1">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <MyButton
                        className="relative w-full md:w-100 lg:absolute lg:top-0 lg:right-25 lg:w-auto"
                        onClick={() => setIsOpen(true)}
                    >
                        Edit Profile
                    </MyButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="avatar">Avatar</Label>
                                <Input id="avatar" name="avatar" type="file" />
                            </Field>
                            <Field>
                                <Label htmlFor="fullname">Fullname</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    onChange={() => setIsInfoChanged(true)}
                                    defaultValue={user?.fullname}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    onChange={() => setIsInfoChanged(true)}
                                    defaultValue={user?.email}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    name="height"
                                    onChange={() => setIsInfoChanged(true)}
                                    defaultValue={user?.height}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="weight">Weight</Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    onChange={() => setIsInfoChanged(true)}
                                    defaultValue={user?.weight}
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-7">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
