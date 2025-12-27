IMPORTANT: OCR SETUP REQUIRED

To make the OCR feature work with the local backend to extract text from prescriptions:

1. You MUST download the Tesseract English training data file.
   Download Link: https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata

2. Place the file 'eng.traineddata' in THIS FOLDER:
   c:\Users\20114\Downloads\New folder\Project_clinic\Backend\dermatologyclinicApp\dermatologyclinic\tessdata\

3. RESTART YOUR BACKEND SERVER.
   Since we added new packages and controllers, you must stop the 'dotnet run' command and run it again.

If you skip this, the app will try to use the free OCR.space API which is unstable.
Moving to this local backend OCR is the best solution for reliability.
