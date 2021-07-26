import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import BackBtn from '../components/BackBtn';
import CustomDatePicker from '../components/CustomDatePicker';

import moment from 'moment';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const ForgetPasswordScreen = ({ navigation }) => {

    console.log("@Forget Password Screen")

    const [email, setEmail] = React.useState('');
    const [data, setData] = React.useState({
        isValidEmail: true,
    });

    const handleValidEmail = (val) => {
        if (val.toString().slice(-10) != '@u.nus.edu') {
            setData({
                isValidEmail: false
            });
        } else {
            setData({
                isValidEmail: true
            });
        }
    }

    const continuePress = () => {
    }

    return (
        <SafeAreaView>

            {/* Back Button  */}
            <BackBtn onPress={() => navigation.goBack()} />

            <ScrollView>
                <View style={styles.container}>
                    {/* Logo */}
                    <Image source={require('../../assets/images/UnILogo(full).png')}
                        style={styles.uniLogo} />

                    <View style={styles.bottomContainer}>
                        {/* Description */}
                        <Text style={styles.headerText}>Forget Password?</Text>
                        <Text style={styles.descriptionText}>Sign up to get started!</Text>
                    </View>

                </View>



                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        mode="outlined"
                        theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={email => setEmail(email.toLocaleLowerCase())}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} />
                    {data.isValidEmail ? null :
                        <Animated.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Please enter a valid NUS email.</Text>
                        </Animated.View>
                    }

                    {/* Continue Button */}
                    <Button style={styles.continueButton}
                        labelStyle={styles.continueButtonText}
                        mode="contained"
                        color="#FD9E0F"
                        uppercase={false}
                        onPress={continuePress}>
                        Continue
                    </Button>
                </View>

            </ScrollView>
        </SafeAreaView >
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    uniLogo: {
        marginTop: -70,
        marginRight: 13,
        width: 300
    },
    headerText: {
        marginTop: 0,
        fontFamily: 'SFPro',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'SFPro',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    date: {
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderColor: '#949494',
        borderWidth: 1
    },
    input: {
        width: 320,
        height: 50,
        paddingTop: 0,
    },
    continueButton: {
        borderRadius: 20,
        marginTop: 40,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    continueButtonText: {
        fontFamily: 'SFPro',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default ForgetPasswordScreen;