const express = require("express");
const router = express.Router();
const Propietario = require("../models/propietario");

// Obtener todos los propietarios
router.get("/", async (req, res) => {
  try {
    const propietarios = await Propietario.find();
    console.log("Propietarios obtenidos:", propietarios);
    res.json(propietarios);
  } catch (err) {
    console.error("Error al obtener propietarios:", err);
    res.status(500).json({ message: err.message });
  }
});

// Agregar un nuevo propietario
router.post("/", async (req, res) => {
  const {
    tipoDocumento,
    numeroDocumento,
    nombres,
    apellidos,
    fechaNacimiento,
    edad,
    correoElectronico,
    celular,
  } = req.body;

  console.log("Datos recibidos en el backend:", req.body);

  if (
    !tipoDocumento ||
    !numeroDocumento ||
    !nombres ||
    !apellidos ||
    !fechaNacimiento ||
    !edad ||
    !correoElectronico ||
    !celular
  ) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const propietario = new Propietario({
    tipoDocumento,
    numeroDocumento,
    nombres,
    apellidos,
    fechaNacimiento,
    edad,
    correoElectronico,
    celular,
  });

  try {
    const nuevoPropietario = await propietario.save();
    console.log("Propietario guardado:", nuevoPropietario);
    res.status(201).json(nuevoPropietario);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "El número de documento ya existe" });
    }
    console.error("Error al guardar propietario:", err);
    res.status(400).json({ message: err.message });
  }
});

// Obtener un propietario por ID
router.get("/:id", async (req, res) => {
  try {
    const propietario = await Propietario.findById(req.params.id);
    if (!propietario)
      return res.status(404).json({ message: "Propietario no encontrado" });
    res.json(propietario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un propietario
router.put("/:id", async (req, res) => {
  try {
    const propietarioActualizado = await Propietario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(propietarioActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un propietario
router.delete("/:id", async (req, res) => {
  try {
    await Propietario.findByIdAndDelete(req.params.id);
    res.json({ message: "Propietario eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
