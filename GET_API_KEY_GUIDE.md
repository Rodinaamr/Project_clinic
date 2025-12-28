# How to Get API Keys for Medical AI Services

To make the AI features (OCR, Diagnosis, Warnings) work with **REAL** intelligence instead of mock data, you need to add an API key.

We recommend **Google Gemini** for testing because it is **FREE** to start.

---

## 🟢 OPTION 1: Google Gemini (Recommended - Free)
Best for testing without adding a credit card immediately.

1. **Go to Google AI Studio**:
   [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. **Sign in** with your Google Account.

3. Click the blue **"Create API Key"** button.
   - If asked, select "Create API key in new project".

4. **Copy the key** (it starts with `AIza...`).

5. **Paste it into your `.env` file**:
   Open the `.env` file in this folder and replace the text matching this line:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyD...<rest_of_your_key>
   ```

---

## 🔵 OPTION 2: OpenAI (ChatGPT)
Best accuracy but requires a credit card/paid account ($5 minimum).

1. **Go to OpenAI Platform**:
   [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

2. **Sign up / Log in**.

3. Click **"Create new secret key"**.
   - Name it "Medical App" or anything you like.
   - Set permissions to "All" (default).

4. **Copy the key** (it starts with `sk-...`).
   *Note: You will only see this key ONCE. Copy it immediately.*

5. **Paste it into your `.env` file**:
   ```env
   EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-...<rest_of_your_key>
   ```

---

## 📷 OPTION 3: Google Cloud Vision (For Better OCR)
If the text extraction (OCR) is failing often, you can get a professional OCR key.

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a Project.
3. Search for **"Cloud Vision API"** and **Enable** it.
4. Go to **Credentials** -> **Create Credentials** -> **API Key**.
5. Copy the key into `.env`:
   ```env
   EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY=AIza...
   ```

---

### Need Help?
After pasting the key, **Restart your App**.
1. Click in the terminal running `npx expo start`.
2. Press `r` to reload.
3. Try scanning a prescription again!
