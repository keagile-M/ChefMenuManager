// screens/AddItemScreen.js
// Lets the chef capture a new menu item: Dish Name, Description,
// Course (dropdown) and Price. Validates required fields, shows
// error messages, and confirms success before returning to the list.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING, FONT, COURSES } from '../theme';

export default function AddItemScreen({ navigation, route }) {
  const { onAddItem } = route.params;

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required.';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Enter a valid price greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    onAddItem(newItem);

    Alert.alert(
      'Item Added',
      `"${newItem.dishName}" was added to the menu.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Add a Menu Item</Text>
        <Text style={styles.subheading}>
          Fill in the details below to add a new dish to your menu.
        </Text>

        {/* Dish Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={[styles.input, errors.dishName && styles.inputError]}
            placeholder="e.g. Grilled Peri-Peri Chicken"
            placeholderTextColor={COLORS.textMuted}
            value={dishName}
            onChangeText={setDishName}
          />
          {errors.dishName ? (
            <Text style={styles.errorText}>{errors.dishName}</Text>
          ) : null}
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError,
            ]}
            placeholder="Short description of the dish"
            placeholderTextColor={COLORS.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}
        </View>

        {/* Course */}
        <View style={styles.field}>
          <Text style={styles.label}>Course</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={course}
              onValueChange={(value) => setCourse(value)}
              style={styles.picker}
            >
              {COURSES.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Price */}
        <View style={styles.field}>
          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            placeholder="e.g. 89.90"
            placeholderTextColor={COLORS.textMuted}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
          {errors.price ? (
            <Text style={styles.errorText}>{errors.price}</Text>
          ) : null}
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Menu Item</Text>
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  heading: {
    fontSize: FONT.title,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: SPACING.xs,
  },
  subheading: {
    fontSize: FONT.body,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT.label,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: FONT.body,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT.small,
    marginTop: SPACING.xs,
  },
  pickerWrapper: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: FONT.subtitle,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: FONT.body,
    fontWeight: '500',
  },
});
