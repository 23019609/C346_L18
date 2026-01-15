import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 10,
    },
    text: {
        flex: 1,
        alignSelf: 'center',
        fontWeight: 'bold',
        padding: 10,
    },
    pic: {
        flex: 1,
    }
});

// create a new variable named originalData - Exercise 1C
let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    // Exercise 1B - add useEffect()
    useEffect(()=> {
        // Add fetch() - Exercise 1A
        const myurl = "https://onlinemovieappwebservice-oz70.onrender.com/allmovies"
        fetch(myurl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })
    }, []);

    const FilterData = (text) => {
        if (text!='') {
            let myFilteredData = originalData.filter((item) =>
                item.movie_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{item.movie_name}</Text>
                <Text style={styles.text}>({item.movie_year})</Text>
                <Image source={{uri: item.movie_pic}} style={{flex: 1, width: 385, height: 150, resizeMode:"contain"}} />
            </View>
        );
    };

    return (
        <View style={{paddingBottom: 100}}>
            <StatusBar/>
            <Text style={{fontWeight: 'bold', marginHorizontal: 10, marginTop: 10,}}>Search:</Text>
            <TextInput style={{margin: 10, marginBottom: 20, borderWidth:1}} onChangeText={(text) => {FilterData(text)}} />
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;