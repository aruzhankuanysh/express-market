import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import { Container } from 'react-bootstrap'
import { Inter } from 'next/font/google'

export default function Home() {
  return (
    <>
      <Container fluid>
        <Header />
      </Container>
    </>
  )
}
