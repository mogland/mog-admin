import {
  Box,
  Button,
  Divider,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { Logo } from '@components/widgets/Logo'
import { PasswordField } from '@components/widgets/PasswordField'
import { OAuthButtonGroup } from '@components/widgets/OAuthButtonGroup'
import { apiClient } from '@utils/request'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLogin = () => {
    apiClient("/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: userNameRef.current?.value,
        password: passwordRef.current?.value
      })
    }).then(res => {
      localStorage.setItem("token", res.token)
      toast({
        title: `欢迎回来，${res.username}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      navigate("/dashboard")
    }).catch(err => {
      toast({
        title: "登录失败",
        description: err.response._data.message,
        duration: 2000,
        status: "error",
        isClosable: true,
      })
    })
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading fontSize={{ base: '2xl' }}>Sign in to your account</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'gray.800', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Username</FormLabel>
                <Input id="username" type="text" ref={userNameRef} />
              </FormControl>
              <PasswordField ref={passwordRef} />
            </Stack>
            <Stack spacing="6">
              <Button 
                colorScheme={"blue"}
                onClick={handleLogin}
              >Sign in</Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}