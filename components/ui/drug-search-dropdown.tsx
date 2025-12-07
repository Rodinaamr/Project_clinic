// app/components/ui/drug-search-dropdown.tsx
import Colors from '@/constants/colors';
import { Check, Pill, Search, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
// Static import of medications JSON for Metro bundler compatibility
import medicationsData from '@/app/data/medications_New_prices_up_to_03-08-2024.json';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Define the drug interface
interface Drug {
  activeingredient: string;
  tradename: string;
  company: string;
  form: string;
  new_price: string;
  id: string;
  pharmacology?: string;
  route?: string;
  group?: string;
  created?: string;
  updated?: string;
}

interface DrugSearchDropdownProps {
  onSelectDrug: (drug: Drug) => void;
  placeholder?: string;
  selectedDrugs?: Drug[];
}

const DrugSearchDropdown: React.FC<DrugSearchDropdownProps> = ({
  onSelectDrug,
  placeholder = "Search for medication...",
  selectedDrugs = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allDrugs, setAllDrugs] = useState<Drug[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load drugs from JSON file
  useEffect(() => {
    loadDrugsData();
  }, []);

  const loadDrugsData = () => {
    try {
      console.log('Loading medications data from JSON file (static import)...');
      const medications = (medicationsData as any) || {};

      if (!medications) {
        console.error('Medications data is undefined or null');
        setIsLoading(false);
        return;
      }

      let drugsArray: Drug[] = [];

      if (Array.isArray(medications)) {
        drugsArray = medications;
      } else if (medications.drugs && Array.isArray(medications.drugs)) {
        drugsArray = medications.drugs;
      } else if (medications.data && Array.isArray(medications.data)) {
        drugsArray = medications.data;
      } else {
        const keys = Object.keys(medications);
        for (const key of keys) {
          const value = medications[key];
          if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const sampleItem = value[0];
            if ('tradename' in sampleItem || 'activeingredient' in sampleItem) {
              drugsArray = value as Drug[];
              break;
            }
          }
        }
      }

      const processedDrugs = drugsArray.map((drug, index) => ({
        ...drug,
        id: drug.id || `drug-${index}`,
        tradename: drug.tradename || 'No trade name',
        activeingredient: drug.activeingredient || 'Not specified',
        company: drug.company || 'Not specified',
        new_price: drug.new_price || 'Not specified',
        form: drug.form || ''
      }));

      setAllDrugs(processedDrugs);
      setFilteredDrugs(processedDrugs.slice(0, 20));
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading medications:', error);
      setIsLoading(false);
    }
  };

  // Search through drugs
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (!text.trim()) {
      setFilteredDrugs(allDrugs.slice(0, 20));
      return;
    }
    
    const searchLower = text.toLowerCase().trim();
    const filtered = allDrugs.filter(drug => {
      return (
        (drug.tradename && drug.tradename.toLowerCase().includes(searchLower)) ||
        (drug.activeingredient && drug.activeingredient.toLowerCase().includes(searchLower)) ||
        (drug.company && drug.company.toLowerCase().includes(searchLower))
      );
    });
    
    setFilteredDrugs(filtered.slice(0, 50));
  };

  // Select a drug
  const handleSelectDrug = (drug: Drug) => {
    // Check if drug is already selected
    const isAlreadySelected = selectedDrugs.some(
      selected => selected.id === drug.id || selected.tradename === drug.tradename
    );
    
    if (!isAlreadySelected) {
      onSelectDrug(drug);
    }
    
    setSearchQuery('');
    setShowDropdown(false);
  };

  // Render each drug item in the list
  const renderDrugItem = ({ item }: { item: Drug }) => {
    const isSelected = selectedDrugs.some(
      selected => selected.id === item.id || selected.tradename === item.tradename
    );
    
    return (
      <TouchableOpacity
        style={[
          styles.drugItem,
          isSelected && styles.drugItemSelected
        ]}
        onPress={() => handleSelectDrug(item)}
        disabled={isSelected}
      >
        <View style={styles.drugIcon}>
          <Pill size={20} color={isSelected ? Colors.white : Colors.primary} />
        </View>
        
        <View style={styles.drugInfo}>
          <Text style={[
            styles.drugName,
            isSelected && styles.drugNameSelected
          ]}>
            {item.tradename}
          </Text>
          <Text style={[
            styles.drugDetails,
            isSelected && styles.drugDetailsSelected
          ]}>
            {item.activeingredient}
          </Text>
          <Text style={[
            styles.drugCompany,
            isSelected && styles.drugCompanySelected
          ]}>
            {item.company} • {item.form}
          </Text>
          {item.new_price && item.new_price !== 'Not specified' && (
            <Text style={[
              styles.drugPrice,
              isSelected && styles.drugPriceSelected
            ]}>
              Price: {item.new_price}
            </Text>
          )}
        </View>
        
        {isSelected && (
          <Check size={20} color={Colors.white} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Input Field */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => setShowDropdown(true)}
        activeOpacity={0.8}
      >
        <Search size={20} color={Colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setShowDropdown(true)}
          placeholderTextColor={Colors.text.secondary}
          editable={!showDropdown}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDropdown(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Medication</Text>
              <TouchableOpacity
                onPress={() => setShowDropdown(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>

            {/* Search inside Modal */}
            <View style={styles.modalSearchContainer}>
              <Search size={20} color={Colors.text.secondary} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search by drug name, active ingredient, or company..."
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
                placeholderTextColor={Colors.text.secondary}
              />
            </View>

            {/* Results List */}
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading medications...</Text>
              </View>
            ) : (
              <FlatList
                data={filteredDrugs}
                renderItem={renderDrugItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Pill size={50} color={Colors.border.light} />
                    <Text style={styles.emptyText}>No medications found</Text>
                    <Text style={styles.emptySubtext}>
                      Try searching by a different name or ingredient
                    </Text>
                  </View>
                }
                style={styles.drugsList}
                keyboardShouldPersistTaps="handled"
              />
            )}

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <Text style={styles.resultsCount}>
                {filteredDrugs.length} medications • {allDrugs.length} total
              </Text>
              <TouchableOpacity
                onPress={() => setShowDropdown(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border.light,
    shadowColor: Colors.shadow.small,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 12,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    marginTop: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  closeButton: {
    padding: 4,
  },
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 16,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  drugsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  drugItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  drugItemSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  drugIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  drugInfo: {
    flex: 1,
  },
  drugName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  drugNameSelected: {
    color: Colors.white,
    fontWeight: '700',
  },
  drugDetails: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  drugDetailsSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  drugCompany: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  drugCompanySelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  drugPrice: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  drugPriceSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    backgroundColor: Colors.white,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
});

export default DrugSearchDropdown;