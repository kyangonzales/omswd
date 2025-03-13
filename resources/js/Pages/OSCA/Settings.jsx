import { Switch } from '@/Components/ui/switch';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { useTheme } from '@/ContextProvider/ThemeContext';
import { Label } from '@/Components/ui/label';

export default function Settings({ auth }) {
    const { theme, toggleTheme, soundEnabled, toggleSound, selectedSound, changeSound, soundOptions } = useTheme();

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="w-full p-10">
                <h1 className="text-xl font-bold">Settings</h1>

                {/* General Settings */}
                <div className="w-full mt-5 border rounded-md p-5">
                    <h1>General</h1>
                    <Label className="flex items-center gap-x-2 mt-5">
                        {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"} 
                        <Switch onClick={toggleTheme} checked={theme === "dark"} />
                    </Label>
                </div>

                {/* Sound Settings */}
                <div className="w-full mt-5 border rounded-md p-5">
                    <h1>Sounds</h1>

                    {/* Sound Toggle */}
                    <Label className="flex items-center gap-x-2 mt-5">
                        {soundEnabled ? "Sound On" : "Sound Off"}
                        <Switch onClick={toggleSound} checked={soundEnabled} />
                    </Label>

                    {/* Sound Selection */}
                    {soundEnabled && (
                        <div className="mt-3">
                            <label className="block text-gray-700 dark:text-white">🔉 Choose Sound:</label>
                            <select
                                value={selectedSound}
                                onChange={(e) => changeSound(e.target.value)}
                                className="w-full p-2 mt-1 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            >
                                {soundOptions.map((sound) => (
                                    <option key={sound.file} value={sound.file}>
                                        {sound.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Other Settings */}
                <div className="w-full mt-5 border rounded-md p-5">
                    <h1>Other</h1>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
