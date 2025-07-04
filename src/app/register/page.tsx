"use client"
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        address: [{ street: "", city: "", country: "" }],
        phone: "",
        role: "",
    });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, idx?: number) => {
        const { name, value } = e.target;
        if (name.startsWith("address.") && typeof idx === "number") {
            const [_, field] = name.split(".");
            const newAddresses = [...form.address];
            newAddresses[idx][field as keyof typeof newAddresses[0]] = value;
            setForm({ ...form, address: newAddresses });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAddAddress = () => {
        setForm({ ...form, address: [...form.address, { street: "", city: "", country: "" }] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            console.log("Sending request...");
            const res = await api.post("http://localhost:8080/api/register", form);
            console.log("sdlmskdmsd");
            console.log("Response received:", res);
            if (res.status === 201) {
                toast.success("Register successful");
                router.push("/");
            } else {
                setError("Register failed. Please try again.");
            }
        } catch (err) {
            console.error("Full error object:", err);
            setError("An error occurred.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="mb-4 text-center">Register</h3>

                {error && (
                    <div className="alert alert-danger text-center py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>First Name</label>
                        <input name="first_name" className="form-control" value={form.first_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Last Name</label>
                        <input name="last_name" className="form-control" value={form.last_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Username</label>
                        <input name="username" className="form-control" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>E-mail</label>
                        <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Phone</label>
                        <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Role</label>
                        <select name="role" className="form-control" value={form.role} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="customer">Customer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Address(es)</label>
                        {form.address.map((addr, idx) => (
                            <div key={idx} className="mb-2 border rounded p-2">
                                <input
                                    name="address.street"
                                    placeholder="Sokak"
                                    className="form-control mb-1"
                                    value={addr.street}
                                    onChange={(e) => handleChange(e, idx)}
                                />
                                <input
                                    name="address.city"
                                    placeholder="Şehir"
                                    className="form-control mb-1"
                                    value={addr.city}
                                    onChange={(e) => handleChange(e, idx)}
                                />
                                <input
                                    name="address.country"
                                    placeholder="Ülke"
                                    className="form-control"
                                    value={addr.country}
                                    onChange={(e) => handleChange(e, idx)}
                                />
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary btn-sm mt-1" onClick={handleAddAddress}>
                            Add Address
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                            Register
                    </button>
                </form>
            </div>
        </div>
    );
}