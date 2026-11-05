# Chef's Menu Manager — Final PoE (MAST5112)


## What changed from Part 2
- Edit and delete menu items (delete asks for confirmation)
- Search by dish name, filter by course, "Clear search and filter"
- Menu Statistics screen: total items, average price, items per course
- Course names now match the brief: Starter, Main Course, Dessert
- Code reorganised: reusable components, helper functions, shared context

## Structure
App.js                    navigation + MenuProvider
theme.js                  colours, spacing, fonts, course names
context/MenuContext.js    menu data + add / update / delete functions
utils/menuUtils.js        validateMenuItem, filterMenuItems,
                          calculateMenuStatistics, formatPrice
components/               AppButton, FormField, MenuItemCard,
                          SearchFilterBar, StatCard, EmptyState
screens/                  MenuListScreen, MenuFormScreen (add + edit),
                          StatisticsScreen

## Run
npm install
npx expo start
