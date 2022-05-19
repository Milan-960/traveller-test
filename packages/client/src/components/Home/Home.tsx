import React from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

export const Home: FC = () => (
  <VStack spacing="8">
    <Heading as="h1">Smart traveller</Heading>
    <Container maxW="container.md">
      <InputGroup>
        <Input
          autoFocus
          placeholder="search your favorite country!!"
          type="text"
          _placeholder={{ color: 'blue.300' }}
          borderColor="blue.300"
        />
        <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
      </InputGroup>
    </Container>
  </VStack>
)
