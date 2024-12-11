# Transcribe Web App

**Transcribe Web App** is a live transcription platform built with **Next.js** and **TypeScript**. It allows users to record audio in real-time, transcribe it into text, and download the text in various file formats, such as `.txt`, `.docx`, and others.

## Features

- **Live Recording**: Record audio in real-time with high accuracy.  
- **Speech-to-Text Conversion**: Convert recorded audio into text using powerful transcription tools.  
- **Export Options**: Download the transcribed text in multiple formats:  
  - `.txt` (Plain Text)  
  - `.docx` (Microsoft Word)  
  - `.pdf` (Portable Document Format)  
- **Responsive Design**: Optimized for desktop and mobile devices for seamless user experience.  
- **Customizable**: Easily adaptable for various use cases, including meetings, interviews, lectures, and personal notes.

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)  
- **Backend**: Node.js (optional if using API routes for processing)  
- **Audio API**: Web Audio API for live recording functionality  
- **File Generation**: Libraries like `FileSaver.js` and `docx` for generating and downloading files

## Directory Structure

```
transcribe-web-app/  
├── public/                  # Static files (e.g., images, fonts)  
├── src/  
│   ├── components/          # Reusable UI components  
│   │   ├── Recorder.tsx     # Live recording interface  
│   │   ├── Transcription.tsx # Displays transcription  
│   │   └── DownloadButton.tsx # File download options  
│   ├── pages/               # Next.js pages  
│   │   ├── index.tsx        # Home page  
│   │   └── api/             # API routes (e.g., for processing audio)  
│   ├── styles/              # CSS/SCSS styles  
│   │   └── globals.css      # Global styles  
│   ├── utils/               # Helper functions and utilities  
│   │   └── fileUtils.ts     # File generation and export logic  
│   └── hooks/               # Custom React hooks  
│       └── useRecorder.ts   # Hook for managing recording state  
├── .env                     # Environment variables  
├── package.json             # Project dependencies and scripts  
├── tsconfig.json            # TypeScript configuration  
└── README.md                # Project documentation  
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)  
- npm or yarn

### Installation

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/transcribe-web-app.git  
   cd transcribe-web-app  
   ```

2. Install dependencies:  
   ```bash  
   npm install  
   # or  
   yarn install  
   ```

3. Run the development server:  
   ```bash  
   npm run dev  
   # or  
   yarn dev  
   ```

4. Open your browser and navigate to:  
   ```
   http://localhost:3000  
   ```

## Usage

1. Click the **Record** button to start recording.  
2. Once done, stop the recording to generate a transcription.  
3. Edit or verify the transcribed text as needed.  
4. Use the **Download** button to save the text in your preferred format.

## Contact

This project is created and maintained by **D.Tech**.  
- Email: [petersdamilare5@gmail.com](mailto:petersdamilare5@gmail.com)  
- Portfolio: [dammytech.netlify.app](https://dammytech.netlify.app)  

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
