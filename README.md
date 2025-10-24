# ✨ Designature

A comprehensive, AI-powered home design platform that guides users through creating their perfect home with intelligent Vastu compliance and design suggestions.

## 🎯 Features

### 🎯 Step-by-Step Wizard

- **Plot Size Configuration**: Input plot dimensions with quick-select options
- **Direction Selection**: Choose plot orientation with Vastu guidance
- **Floor Planning**: Select number of floors with practical suggestions
- **Room Configuration**: Define bedrooms, bathrooms, and essential spaces
- **Feature Selection**: Add amenities like gym, pooja room, balconies, parking, etc.
- **AI-Generated Layout**: Automatic floor plan generation based on inputs
- **Interactive Customization**: Fine-tune room dimensions and placements
- **Review & Export**: Download designs in PDF, PNG, or JSON formats

### 🧠 Intelligent Features

- **Real-time Validation**: Instant feedback on dimensions and space utilization
- **Vastu Compliance**: Traditional Indian architectural principles integration
- **Smart Suggestions**: Context-aware tips for optimal design
- **Space Optimization**: Automatic calculation of built-up area and utilization
- **Design Standards**: Built-in room dimension standards and guidelines
- **Warning System**: Alerts for impractical or uncomfortable designs

### 🎨 Modern UI/UX

- Beautiful gradient backgrounds
- Smooth transitions and animations
- Fully responsive design (mobile, tablet, desktop)
- Progress tracking with visual stepper
- Color-coded room categories
- Interactive floor plan visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Modern web browser

### Installation

1. **Navigate to the project directory**:

   ```bash
   cd HouseDesignWizard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 📁 Project Structure

```
HouseDesignWizard/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── SuggestionBox.jsx      # Reusable suggestion component
│   │   ├── steps/
│   │   │   ├── PlotSizeStep.jsx       # Plot dimension input
│   │   │   ├── DirectionStep.jsx      # Plot direction selection
│   │   │   ├── FloorsStep.jsx         # Number of floors
│   │   │   ├── RoomsStep.jsx          # Essential rooms configuration
│   │   │   ├── FeaturesStep.jsx       # Additional features selection
│   │   │   ├── LayoutDesignStep.jsx   # AI-generated layout
│   │   │   ├── CustomizationStep.jsx  # Interactive customization
│   │   │   └── ReviewStep.jsx         # Final review and export
│   │   └── WizardContainer.jsx        # Main wizard container
│   ├── context/
│   │   └── DesignContext.jsx          # Global state management
│   ├── utils/
│   │   └── designRules.js             # Vastu rules, validation, standards
│   ├── App.jsx                         # Main app component
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles
├── public/                             # Static assets
├── index.html                          # HTML template
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── postcss.config.js                   # PostCSS configuration
```

## 🎯 Usage Flow

1. **Plot Size**: Enter plot dimensions (or quick-select common sizes)
2. **Direction**: Choose plot facing direction for Vastu alignment
3. **Floors**: Select number of floors (1-4)
4. **Rooms**: Configure bedrooms, bathrooms, kitchen count
5. **Features**: Add optional rooms (pooja, gym, study, etc.)
6. **Layout**: AI generates optimal floor plan automatically
7. **Customize**: Fine-tune individual room dimensions
8. **Review**: See complete summary and download design

## 🔧 Customization

### Adding New Room Types

Edit `src/utils/designRules.js` to add new room standards:

```javascript
export const ROOM_STANDARDS = {
  yourRoom: {
    min: 50,
    ideal: 80,
    max: 150,
    minDimension: 8,
  },
};
```

### Modifying Vastu Rules

Update `VASTU_RULES` in `src/utils/designRules.js`:

```javascript
export const VASTU_RULES = {
  directions: {
    yourDirection: {
      favorable: ["room1", "room2"],
      unfavorable: ["room3"],
      description: "Your description",
    },
  },
};
```

### Styling

- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific: Use Tailwind utility classes

## 📊 Design Validation Rules

### Space Utilization

- **Under 40%**: Underutilized - suggest more rooms
- **40-75%**: Optimal - good balance
- **75-90%**: Tight - limited circulation
- **Over 90%**: Overcrowded - reject or warn

### Room Standards (Minimum)

- Master Bedroom: 150 sq ft (12' × 12')
- Regular Bedroom: 100 sq ft (10' × 10')
- Bathroom: 35 sq ft (5' × 7')
- Kitchen: 80 sq ft (8' × 10')
- Living Room: 150 sq ft (12' × 12')

### Vastu Compliance

- Northeast: Pooja room, entrance
- Southeast: Kitchen
- Southwest: Master bedroom
- Northwest: Guest rooms, bathrooms

## 🚧 Future Enhancements

### Planned Features

1. **3D Visualization**: Three.js integration for 3D floor plans
2. **Drag & Drop Editor**: React DnD for interactive room placement
3. **Cost Estimation**: Calculate construction costs
4. **Material Selection**: Choose finishes and materials
5. **Backend Integration**: Save designs to cloud (Firebase/Supabase)
6. **User Accounts**: Login and save multiple designs
7. **AI Recommendations**: ML-based layout optimization
8. **Virtual Tours**: 360° walkthrough generation
9. **Collaboration**: Share and collaborate on designs
10. **Mobile App**: React Native version

### Advanced Features

- **Building Code Compliance**: Region-specific building regulations
- **Energy Efficiency**: Solar panel placement, insulation recommendations
- **Accessibility**: ADA/disability-friendly design options
- **Landscaping**: Garden and outdoor area design
- **Interior Design**: Furniture placement and decor suggestions
- **Smart Home**: IoT device placement planning
- **Multi-unit**: Apartment complex and multi-family home design

### Technical Improvements

- **State Persistence**: LocalStorage/SessionStorage integration
- **Undo/Redo**: History management for design changes
- **Keyboard Shortcuts**: Power user features
- **Print Optimization**: Better print layouts for PDF export
- **Internationalization**: Multi-language support
- **Dark Mode**: Theme switching
- **Performance**: Code splitting, lazy loading
- **Testing**: Unit tests, E2E tests with Vitest/Cypress
- **Analytics**: Track user interactions and improve UX

## 🎨 Design Philosophy

### User-Centric

- **Naive User Friendly**: No design knowledge required
- **Progressive Disclosure**: Show complexity gradually
- **Intelligent Defaults**: Smart starting points
- **Real-time Feedback**: Instant validation and suggestions

### Professional Quality

- **Industry Standards**: Based on architectural best practices
- **Vastu Integration**: Traditional wisdom meets modern design
- **Practical Constraints**: Real-world considerations (plumbing, structure)
- **Compliance Ready**: Building code awareness

### Modern Technology

- **React 18**: Latest React features
- **Vite**: Lightning-fast development
- **Tailwind CSS**: Utility-first styling
- **Responsive**: Mobile-first approach
- **Accessible**: WCAG compliance

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Developer Notes

### State Management

- Uses React Context API for global state
- `DesignContext` manages all design data
- Each step component updates context independently

### Validation Strategy

- Client-side validation for instant feedback
- Multiple validation passes (dimensions, Vastu, practicality)
- Graceful degradation - warnings vs. errors

### Component Architecture

- **Container/Presentational** pattern
- **Reusable components** in `common/`
- **Step components** handle their own logic
- **Context** for cross-component state

### Performance Considerations

- Minimal re-renders with `useCallback`
- Lazy loading for heavy components (future)
- Optimized bundle size with tree-shaking

---

**Built with ❤️ for aspiring home designers**
