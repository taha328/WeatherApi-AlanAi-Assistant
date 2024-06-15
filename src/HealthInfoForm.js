import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const HealthInfoForm = () => {
    const [healthInfo, setHealthInfo] = useState({
        nomComplet: '',
        temperatureCorporelle: '',
        tensionArterielle: '',
        symptomes: '',
        groupeAge: '',
        adresse: '',
        accesRefroidissement: '',
        contactUrgence: '',
        conditionsMedicales: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHealthInfo({ ...healthInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoyer les données de santé au serveur
            await axios.post('http://localhost:5000/health-info', healthInfo);
            // Réinitialiser le formulaire après soumission réussie
            setHealthInfo({
                nomComplet: '',
                temperatureCorporelle: '',
                tensionArterielle: '',
                symptomes: '',
                groupeAge: '',
                adresse: '',
                accesRefroidissement: '',
                contactUrgence: '',
                conditionsMedicales: ''
            });
            alert('Informations de santé soumises avec succès !');
        } catch (error) {
            console.error('Erreur lors de la soumission des informations de santé :', error);
            alert('Échec de la soumission des informations de santé');
        }
    };

    return (
        <div style={{ backgroundColor: 'white', maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit} className="health-form">
                <h2 style={{ textAlign: 'center' }}>Informations de Santé</h2>
                <TextField
                    label="Nom Complet"
                    variant="outlined"
                    name="nomComplet"
                    value={healthInfo.nomComplet}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Température Corporelle"
                    variant="outlined"
                    name="temperatureCorporelle"
                    value={healthInfo.temperatureCorporelle}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Tension Artérielle"
                    variant="outlined"
                    name="tensionArterielle"
                    value={healthInfo.tensionArterielle}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Symptômes"
                    variant="outlined"
                    name="symptomes"
                    value={healthInfo.symptomes}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Groupe d'âge</InputLabel>
                    <Select
                        name="groupeAge"
                        value={healthInfo.groupeAge}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="">Sélectionnez le groupe d'âge</MenuItem>
                        <MenuItem value="children">Enfants</MenuItem>
                        <MenuItem value="adults">Adultes</MenuItem>
                        <MenuItem value="Personnes_âgées">Personnes âgées</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Adresse"
                    variant="outlined"
                    name="adresse"
                    value={healthInfo.adresse}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Accès au Refroidissement</InputLabel>
                    <Select
                        name="accesRefroidissement"
                        value={healthInfo.accesRefroidissement}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="">Sélectionnez une option</MenuItem>
                        <MenuItem value="airConditioning">Climatisation</MenuItem>
                        <MenuItem value="fan">Ventilateur</MenuItem>
                        <MenuItem value="none">Aucun</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Contact d'Urgence"
                    variant="outlined"
                    name="contactUrgence"
                    value={healthInfo.contactUrgence}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Conditions Médicales"
                    variant="outlined"
                    name="conditionsMedicales"
                    value={healthInfo.conditionsMedicales}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Soumettre les informations de santé
                </Button>
            </form>
        </div>
    );
};

export default HealthInfoForm;
