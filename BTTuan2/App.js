import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const IntroScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 10000); // Chuyển sau 10 giây

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/background.jpg' }} // Thay đổi đường dẫn hình nền nếu cần
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.introText}>Thông Tin Cá Nhân</Text>
        <Text style={styles.introSubText}>Tên: Trần Khải Hoàn</Text>
        <Text style={styles.introSubText}>MSSV: 21110827</Text>
      </View>
    </ImageBackground>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>Đây là Trang Chủ</Text>
    </View>
  );
};

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registeredUsers = route.params?.registeredUsers || {};

  const handleLogin = () => {
    if (registeredUsers[username] && registeredUsers[username] === password) {
      navigation.replace('Intro');
    } else {
      Alert.alert('Đăng nhập thất bại', 'Tên người dùng hoặc mật khẩu không chính xác');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate('Register', { registeredUsers })}
      >
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registeredUsers = route.params?.registeredUsers || {};

  const handleRegister = () => {
    if (registeredUsers[username]) {
      Alert.alert('Đăng ký thất bại', 'Tên người dùng đã tồn tại');
    } else {
      registeredUsers[username] = password;
      Alert.alert('Đăng ký thành công', 'Bạn đã đăng ký thành công!');
      navigation.navigate('Login', { registeredUsers });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  introText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  introSubText: {
    fontSize: 18,
    marginTop: 10,
    color: '#000',
  },
  homeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#32cd32',
  },
  backButton: {
    backgroundColor: '#ff6347',
  },
});
