const pdfRouter = require('express').Router();
const Pdf = require('../model/pdf');
const User = require('../model/user');
const PDFDocument = require('pdfkit');
const fs = require('fs');

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
            
        
            const user = await Pdf.findOne({user: userId}).sort({ createdAt: -1 });
            if (!user) {
              return response.status(404).json({ error: 'Usuario no encontrado' });
            }
        
            // Generar el PDF
            const doc = new PDFDocument();
        
            // Agregar contenido al PDF
            // Encabezado del PDF
            doc.fontSize(20).text('Medical Health', { align: 'center' });
            doc.moveDown();
            doc.fontSize(14).text('Consultorio de Medicina', { align: 'center' });
            doc.moveDown(2);
            doc.fontSize(16).text('Recipe:', { underline: false });
            doc.fontSize(12).text(user.Recipe);
            doc.moveDown();
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

pdfRouter.get('/all', async (request, response) => {
  try {
    const userId = request.user;
      
  
      const user = await Pdf.findOne({user: userId});
      if (!user) {
        return response.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Generar el PDF
      const doc = new PDFDocument();
  
      // Agregar contenido al PDF
      // Encabezado del PDF
      doc.fontSize(20).text('Medical Health', { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text('Consultorio de Medicina', { align: 'center' });
      doc.moveDown(2);
      doc.fontSize(16).text('Recipe:', { underline: false });
      doc.fontSize(12).text(user.Recipe);
      doc.moveDown();
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

module.exports = pdfRouter;