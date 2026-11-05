// screens/MenuListScreen.js
// Displays every menu item added so far. Updates automatically
// whenever the list of items changes (it's driven by App state).
// Shows a friendly empty-state message when there are no items yet.

import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT } from '../theme';

function MenuItemCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>R{item.price}</Text>
      </View>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

export default function MenuListScreen({ navigation, menuItems, onAddItem }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chef's Menu Manager</Text>
        <Text style={styles.subheading}>
          {menuItems.length === 0
            ? 'Your menu is currently empty'
            : `${menuItems.length} item${menuItems.length === 1 ? '' : 's'} on the menu`}
        </Text>
      </View>

      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No menu items yet</Text>
          <Text style={styles.emptyText}>
            Tap "Add Menu Item" below to add your first dish.
          </Text>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          contentContainerStyle={styles.list}
        />
      )}

      <Pressable
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddItem', { onAddItem })
        }
      >
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  heading: {
    fontSize: FONT.title,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  subheading: {
    fontSize: FONT.body,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: FONT.subtitle,
    fontWeight: '700',
    color: COLORS.text,
    flexShrink: 1,
    paddingRight: SPACING.sm,
  },
  price: {
    fontSize: FONT.subtitle,
    fontWeight: '700',
    color: COLORS.primary,
  },
  course: {
    fontSize: FONT.small,
    fontWeight: '600',
    color: COLORS.accent,
    marginTop: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: FONT.body,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT.subtitle,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 10,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: FONT.subtitle,
    fontWeight: '600',
  },
});
