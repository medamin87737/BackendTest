
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFileCsv, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { LoadingSpinner } from './LoadingSpinner';

export const UploadEmployeesCSV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation du fichier CSV
  const isValidCSVFile = (file: File): boolean => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/csv',
      'text/x-csv',
      'application/x-csv',
      'text/comma-separated-values',
      'text/x-comma-separated-values',
    ];
    
    // Vérifier le type MIME ou l'extension
    const isCSVType = allowedTypes.includes(file.type);
    const hasCSVExtension = file.name.toLowerCase().endsWith('.csv');
    
    return isCSVType || hasCSVExtension;
  };

  // Gestion de la sélection de fichier
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setFile(null);
      setError(null);
      return;
    }

    const selectedFile = files[0];

    if (!isValidCSVFile(selectedFile)) {
      setFile(null);
      setError('Format de fichier invalide. Veuillez sélectionner un fichier CSV (.csv)');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB max
      setFile(null);
      setError('Fichier trop volumineux. Taille maximale : 10MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccessMessage(null);
  };

  // Gestion de l'upload
  const handleUpload = async () => {
    if (!file) {
      setError('Aucun fichier sélectionné');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch('http://localhost:3000/api/hr/upload-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
      }

      const result = await response.json();
      
      setSuccessMessage(result.message || 'Fichier uploadé avec succès !');
      setIsUploading(false);

      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setFile(null);
        setSuccessMessage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 5000);

    } catch (error) {
      setIsUploading(false);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'upload');
    }
  };

  // Réinitialiser
  const handleReset = () => {
    setFile(null);
    setError(null);
    setSuccessMessage(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Importation des employés</h1>
        <p className="text-gray-300">
          Importez un fichier CSV contenant les données des employés pour mettre à jour la base de données.
        </p>
      </div>

      {/* Zone de sélection de fichier */}
      <div className={`backdrop-blur-xl rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
        file
          ? 'border-primary-400 bg-primary-400/10'
          : 'border-white/20 bg-white/5 hover:border-primary-300 hover:bg-white/10'
      }`}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileSelect}
          className="hidden"
          id="csv-file-input"
          disabled={isUploading}
        />

        <label htmlFor="csv-file-input" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-primary-900/30">
              <FaFileCsv className="text-4xl text-primary-300" />
            </div>
            
            <div>
              <p className="text-xl font-semibold text-white mb-2">
                {file ? file.name : 'Sélectionnez un fichier CSV'}
              </p>
              <p className="text-gray-300 mb-4">
                {file 
                  ? `Taille : ${(file.size / 1024 / 1024).toFixed(2)} MB`
                  : 'Cliquez pour sélectionner un fichier'
                }
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 rounded-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors"
              disabled={isUploading}
            >
              Parcourir les fichiers
            </button>
          </div>
        </label>

        <p className="text-sm text-gray-400 mt-4">
          Format accepté : CSV (max. 10MB). Assurez-vous que le fichier contient les colonnes requises.
        </p>
      </div>

      {/* Message d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-lg border border-red-400 bg-red-500/20 px-4 py-3 flex items-start gap-3"
        >
          <FaExclamationTriangle className="text-red-300 mt-0.5" />
          <div>
            <p className="font-medium text-red-100">Erreur</p>
            <p className="text-sm text-red-200">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Message de succès */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-lg border border-emerald-400 bg-emerald-500/20 px-4 py-3 flex items-start gap-3"
        >
          <FaCheckCircle className="text-emerald-300 mt-0.5" />
          <div>
            <p className="font-medium text-emerald-100">Succès</p>
            <p className="text-sm text-emerald-200">{successMessage}</p>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-lg shadow-primary-900/40 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isUploading ? (
            <>
              <LoadingSpinner label="" />
              <span>Upload en cours...</span>
            </>
          ) : (
            <>
              <FaUpload />
              <span>Uploader le CSV</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isUploading}
          className="px-6 py-3 rounded-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Réinitialiser
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-700">
        <h3 className="font-semibold text-white mb-2">Format CSV requis :</h3>
        <div className="text-sm text-gray-300 space-y-1">
          <p>Le fichier doit contenir ces colonnes (en-têtes exacts) :</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <code className="bg-black/30 px-2 py-1 rounded">firstName</code>
            <code className="bg-black/30 px-2 py-1 rounded">lastName</code>
            <code className="bg-black/30 px-2 py-1 rounded">email</code>
            <code className="bg-black/30 px-2 py-1 rounded">department</code>
            <code className="bg-black/30 px-2 py-1 rounded">position</code>
            <code className="bg-black/30 px-2 py-1 rounded">hireDate</code>
          </div>
          <p className="mt-2">Exemple de format de date : <code>2024-01-15</code></p>
        </div>
      </div>
    </motion.div>
  );
};
