import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [equipment, setEquipment] = useState('');
  const [routine, setRoutine] = useState('');
  const OPENAI_API_KEY = "PEGA_AQUÍ_TU_API_KEY"; // 👈 Reemplaza esto con tu clave

  const generateRoutine = async () => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Genera una rutina con ${equipment} (4 ejercicios, formato: 1. Nombre - 3x12)`
        }]
      })
    });
    const data = await response.json();
    setRoutine(data.choices[0].message.content);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Ej: pesas, bandas"
        value={equipment}
        onChangeText={setEquipment}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Generar Rutina" onPress={generateRoutine} />
      <Text style={{ marginTop: 20 }}>{routine}</Text>
    </View>
  );
}
