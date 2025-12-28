import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

// Interface matching Backend DTO
interface MeetingSummary {
    id: string;
    patientName: string;
    date: string;
    time: string;
    type: string;
    duration: string;
    summary: string;
    actionItems: string[];
    sentiment: string;
}

export default function MeetingSummaries() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [summaries, setSummaries] = useState<MeetingSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSummary, setSelectedSummary] = useState<MeetingSummary | null>(null);

    useEffect(() => {
        fetchSummaries();
    }, []);

    const fetchSummaries = async () => {
        try {
            const response = await api.get('/MeetingSummaries');
            setSummaries(response.data);
        } catch (error) {
            console.error('Failed to fetch summaries:', error);
            Alert.alert('Error', 'Could not load meeting summaries.');
        } finally {
            setLoading(false);
        }
    };

    const filteredSummaries = summaries.filter(item =>
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderSummaryCard = (item: MeetingSummary) => (
        <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => setSelectedSummary(item)}
        >
            <LinearGradient
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
                style={styles.cardGradient}
            >
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.patientName}>{item.patientName}</Text>
                        <Text style={styles.dateText}>{item.date} • {item.time}</Text>
                    </View>
                    <View style={[styles.typeTag, { backgroundColor: getTypeColor(item.type) }]}>
                        <Text style={styles.typeText}>{item.type}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.summaryPreview} numberOfLines={2}>
                    {item.summary}
                </Text>

                <View style={styles.cardFooter}>
                    <View style={styles.metaInfo}>
                        <Ionicons name="time-outline" size={14} color="#666" />
                        <Text style={styles.metaText}>{item.duration}</Text>
                    </View>
                    <TouchableOpacity style={styles.readMoreBtn}>
                        <Text style={styles.readMoreText}>Read Full Summary</Text>
                        <Ionicons name="arrow-forward" size={14} color="#4A90E2" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <LinearGradient colors={['#F4F8FD', '#EBF2FA']} style={styles.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meeting Summaries</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search summaries or patients..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.input}
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Content */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Recent Consultations</Text>
                {filteredSummaries.map(renderSummaryCard)}
            </ScrollView>

            {/* Detail Modal */}
            <Modal
                visible={!!selectedSummary}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedSummary(null)}
            >
                {selectedSummary && (
                    <BlurView intensity={20} style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Consultation Details</Text>
                                <TouchableOpacity onPress={() => setSelectedSummary(null)} style={styles.closeBtn}>
                                    <Ionicons name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalScroll}>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>PATIENT</Text>
                                    <Text style={styles.modalValue}>{selectedSummary.patientName}</Text>
                                    <Text style={styles.modalSubValue}>{selectedSummary.date} at {selectedSummary.time}</Text>
                                </View>

                                <View style={[styles.statusBadge, { alignSelf: 'flex-start', backgroundColor: getTypeColor(selectedSummary.type) + '20' }]}>
                                    <Text style={[styles.statusText, { color: getTypeColor(selectedSummary.type) }]}>
                                        {selectedSummary.type}
                                    </Text>
                                </View>

                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>SUMMARY</Text>
                                    <View style={styles.summaryBox}>
                                        <Text style={styles.fullSummary}>{selectedSummary.summary}</Text>
                                    </View>
                                </View>

                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>ACTION ITEMS</Text>
                                    {selectedSummary.actionItems.map((action, index) => (
                                        <View key={index} style={styles.actionItem}>
                                            <Ionicons name="checkbox-outline" size={20} color="#4A90E2" />
                                            <Text style={styles.actionText}>{action}</Text>
                                        </View>
                                    ))}
                                </View>

                                <TouchableOpacity style={styles.exportButton}>
                                    <Ionicons name="share-outline" size={20} color="#fff" />
                                    <Text style={styles.exportBtnText}>Share / Export Summary</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </BlurView>
                )}
            </Modal>
        </SafeAreaView>
    );
}

// Helper to get color based on meeting type
const getTypeColor = (type: string) => {
    switch (type) {
        case 'Initial Consultation': return '#FF9F43';
        case 'Emergency': return '#EF5350';
        default: return '#4A90E2';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F8FD',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    filterButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    card: {
        marginBottom: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
        backgroundColor: 'transparent',
    },
    cardGradient: {
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    patientName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 13,
        color: '#666',
    },
    typeTag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginBottom: 12,
    },
    summaryPreview: {
        fontSize: 14,
        lineHeight: 20,
        color: '#444',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
    },
    readMoreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    readMoreText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4A90E2',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '85%',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    closeBtn: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    modalScroll: {
        flex: 1,
    },
    modalSection: {
        marginBottom: 24,
    },
    modalLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#888',
        letterSpacing: 1,
        marginBottom: 8,
    },
    modalValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    modalSubValue: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 24,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
    },
    summaryBox: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    fullSummary: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
        backgroundColor: '#F0F7FF',
        padding: 14,
        borderRadius: 12,
    },
    actionText: {
        fontSize: 15,
        color: '#2c3e50',
        flex: 1,
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A90E2',
        padding: 16,
        borderRadius: 16,
        gap: 10,
        marginTop: 10,
        marginBottom: 30,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    exportBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
