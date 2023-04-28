import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import { Container } from 'react-bootstrap'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Container fluid>
        <Header />
        <Footer/>
      </Container>
    </>
  )
}
