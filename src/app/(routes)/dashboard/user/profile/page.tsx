"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CategoryToggleList from "./categoriesList";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    instagram: "", // Nuevo campo
    facebook: ""   // Nuevo campo
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/user?email=${session.user?.email}`);
        if (!response.ok) throw new Error("No se pudo obtener la información del perfil.");

        const data = await response.json();
        setFormData({
          name: data.user?.name || "",
          phone: data.user?.phone || "",
          instagram: data.user?.instagram || "", // Cargar valor existente
          facebook: data.user?.facebook || ""    // Cargar valor existente
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, session?.user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotification("");

    if (!session?.user) {
      setNotification("⚠️ No estás autenticado.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          name: formData.name,
          phone: formData.phone,
          instagram: formData.instagram, // Incluir nuevo campo
          facebook: formData.facebook    // Incluir nuevo campo
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setNotification("✅ Perfil actualizado con éxito.");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (error) {
      setNotification("❌ Error al actualizar el perfil. Inténtalo de nuevo.");
      console.error('Error al actualizar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return <p>Cargando...</p>;

  return (
    <div className="text-black">
      {notification && (
        <div className={`mt-4 p-2 text-white rounded ${notification.includes("Error") ? "bg-red-500" : "bg-green-500"}`}>
          {notification}
        </div>
      )}

      {loading && <p>loading...</p>}
      <div className="p-4 max-w-6xl mx-auto">
        <div className="px-4 my-6">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
              Información General
            </h1>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmitUpdateProfile}
        className="grid grid-cols-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Nuevo campo para Instagram */}
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-gray-700 text-sm font-bold mb-2">
            Instagram <span className="text-gray-500 font-normal">(@username)</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              @
            </span>
            <input
              className="shadow border rounded-r w-full py-2 px-3"
              type="text"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="tuusuario"
            />
          </div>
        </div>

        {/* Nuevo campo para Facebook */}
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-gray-700 text-sm font-bold mb-2">
            Facebook <span className="text-gray-500 font-normal">(username o URL)</span>
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="tuusuario"
          />
        </div>

        <div className="flex items-center justify-between col-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </form>
      <div className="p-4 max-w-6xl mx-auto">
      <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-blue-600 tracking-tight">
              Ajusta lo que quieres vender
            </h2>
          </div>
      <CategoryToggleList />
      </div>
    </div>
  );
}