const pdfRouter = require('express').Router();
const Pdf = require('../model/pdf');
const User = require('../model/user');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Cita = require('../model/cita');
const path = require('path');


pdfRouter.post('/:id', async (request, response) => {
    try {
    const userId = request.params.id;
    const {Recipe, Indicaciones} = request.body;
    const newPdf = new Pdf({
        Recipe,
        Indicaciones,
        user: userId
    });

    const user =await User.findById(userId);
    if(!user){
        return response.status(404).json({ error: 'Usuario no encontrado' });
    }
     // Generar el PDF
    const doc = new PDFDocument();

    // Agregar contenido al PDF
    doc.fontSize(16).text('Receta:', { underline: false });
    doc.fontSize(12).text(Recipe);
    doc.moveDown();
    doc.fontSize(16).text('Indicaciones:', { underline: false });
    doc.fontSize(12).text(Indicaciones);

    // Finalizar el PDF
    doc.end();

    // Configurar los encabezados de la respuesta
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'inline; filename="recipe.pdf"');

    // Enviar el PDF como respuesta
    doc.pipe(response);

    // Guardar el PDF en la base de datos
    const savedPdf = await newPdf.save();
    user.pdf = user.pdf.concat(savedPdf._id);
    await user.save();

    } catch (error) {
    console.log(error);        
    }

})

pdfRouter.get('/', async (request, response) => {
  try {
    const userId = request.user;

    const user = await Pdf.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!user) {
      return response.status(204).end();
    }

    // Generar el PDF
    const doc = new PDFDocument();

    // Configurar los encabezados de la respuesta
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'inline; filename="recipe.pdf"');

    // Encabezado del PDF
    const headerImagePath = path.resolve('img/membrete-encabezado.png');
    const headerImageOptions = {
      fit: [doc.page.width, doc.page.height], // Ajustar al ancho y alto de la página
      align: 'center',
      valign: 'top',
    };
    doc.image(headerImagePath, 0, 0, headerImageOptions);

    doc.image(headerImagePath, 0, 0, headerImageOptions);

    // Pie de página
    const footerImagePath = path.resolve('img/pieDePagina.png');
    const footerImageOptions = {
      width: doc.page.width,
      height: 100,
      align: 'center',
      valign: 'bottom',
    };
    doc.image(footerImagePath, 0, doc.page.height - 100, footerImageOptions);

    // Encabezado del PDF
    doc.moveDown(6)
    doc.fontSize(14).text('Consultorio de Medicina', { align: 'center' });
    doc.moveDown(3);
    doc.fontSize(16).text('Recipe:', { underline: false });
    doc.fontSize(12).text(user.Recipe);
    doc.moveDown(2);
    doc.fontSize(16).text('Indicaciones:', { underline: false });
    doc.fontSize(12).text(user.Indicaciones);

    // Finalizar el PDF
    doc.end();

    // Enviar el PDF como respuesta
    doc.pipe(response);
  } catch (error) {
    console.log(error);
  }
});

pdfRouter.get('/all', async (request, response) => {
  try {
    const user = request.user;

    const pdfs = await Pdf.find({ user: user.id });
    if (!pdfs) {
      return response.status(404).json({ error: 'No se encontraron PDFs' });
    }

    response.json(pdfs);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});

pdfRouter.get('/:id', async (request, response) => {
  try {
    const userId = request.params.id;
  
      const user = await Pdf.findById(userId);
      if (!user) {
        return response.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Generar el PDF
      const doc = new PDFDocument();
  
        // Encabezado del PDF
    const headerImagePath = path.resolve('img/membrete-encabezado.png');
    const headerImageOptions = {
      fit: [doc.page.width, doc.page.height], // Ajustar al ancho y alto de la página
      align: 'center',
      valign: 'top',
    };
    doc.image(headerImagePath, 0, 0, headerImageOptions);

    doc.image(headerImagePath, 0, 0, headerImageOptions);

    // Pie de página
    const footerImagePath = path.resolve('img/pieDePagina.png');
    const footerImageOptions = {
      width: doc.page.width,
      height: 100,
      align: 'center',
      valign: 'bottom',
    };
    doc.image(footerImagePath, 0, doc.page.height - 100, footerImageOptions);

    // Encabezado del PDF
    doc.moveDown(6)
    doc.fontSize(14).text('Consultorio de Medicina', { align: 'center' });
    doc.moveDown(3);
    doc.fontSize(16).text('Recipe:', { underline: false });
    doc.fontSize(12).text(user.Recipe);
    doc.moveDown(2);
    doc.fontSize(16).text('Indicaciones:', { underline: false });
    doc.fontSize(12).text(user.Indicaciones);

      // Finalizar el PDF
      doc.end();
  
      // Configurar los encabezados de la respuesta
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-Disposition', 'inline; filename="recipe.pdf"');
  
      // Enviar el PDF como respuesta
      doc.pipe(response);
  
} catch (error) {
  console.log(error);
}
});

pdfRouter.delete('/:id', async (request, response) => {
  try {
  const user = request.user;

  await Pdf.findByIdAndDelete(request.params.id);

  user.pdf = user.pdf.filter(id => id.toString() !== request.params.id);
  await user.save();

  return response.status(204);

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = pdfRouter;