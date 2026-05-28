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

import MyButton from "@/components/ui/Button.jsx"
import { Button } from "@/components/ui/button.jsx";
import { useAuth } from "@/stores/user.store.js";
import { useState } from "react";
import axios from "../../lib/axios"

export default function ProfileCard() {
    const user = useAuth(s => s.user);
    const [isOpen, setIsOpen] = useState(false)
    const stats = [
        { label: "Height", value: user.height ? `${user.height}cm` : "—" },
        { label: "Weight", value: user.weight ? `${user.weight}kg` : "—" },
    ];

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const avatar = form.get("avatar");
        const hasNewfile = avatar && avatar.size > 0;

        try {
            if (hasNewfile) {
                await axios.put("/user/update-avatar", { avatar }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            // const res = await axios.patch(`/user/update-user-avatar`, avatar)
        } catch (error) {
            console.log(error)
        }
        form.reset();
        setIsOpen(false);
    }

    return (
        <div className="relative flex h-auto w-full flex-col items-center justify-start gap-10 lg:mt-10 lg:flex-row">
            <div className="shadow-standard size-60 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                <img src={user?.avatar?.url} className="cursor-default" />
            </div>
            <div>
                <h2 className="text-center text-xl font-semibold text-neutral-700 cursor-default lg:text-left">
                    {user?.fullname ?? "User fullname"}
                </h2>
                <p className="text-center text-base text-neutral-500 cursor-default  lg:text-left">
                    {user?.email ?? "example@abc.com"}
                </p>
                <div className="no-scrollbar mt-8 flex w-screen gap-3 overflow-auto scroll-smooth px-4 py-2 lg:w-auto lg:px-0">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 border border-line-color/50 rounded-xl p-6 flex flex-col gap-3 w-fit min-w-50 ">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-default">
                                    {stat.label}
                                </p>

                            </div>

                            <div className="flex items-baseline gap-1 cursor-default">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <MyButton className="relative w-full  lg:absolute lg:top-0 lg:right-25 lg:w-auto">
                        Edit Profile
                    </MyButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
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
                                <Input id="fullname" name="fullname" defaultValue={user?.fullname} />
                            </Field>
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" defaultValue={user?.email} />
                            </Field>
                            <Field>
                                <Label htmlFor="height">Height</Label>
                                <Input id="height" name="height" defaultValue={user?.height} />
                            </Field>
                            <Field>
                                <Label htmlFor="weight">Weight</Label>
                                <Input id="weight" name="weight" defaultValue={user?.weight} />
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
    );
}



