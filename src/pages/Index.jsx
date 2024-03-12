import React, { useState } from "react";
import { Box, Container, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, Heading, Image } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Index = () => {
  // Assuming we have the Sehri and Iftar times for Srinagar for 2024
  const ramadanTimes = [
    { date: "23 March", sehri: "05:00 AM", iftar: "06:45 PM" },
    { date: "24 March", sehri: "04:58 AM", iftar: "06:46 PM" },
    // ... more dates
  ];

  const [hanafiTimeAdjustment] = useState({ sehri: -10, iftar: +10 }); // In minutes

  const adjustedTimes = ramadanTimes.map((day) => ({
    ...day,
    sehri: adjustTime(day.sehri, hanafiTimeAdjustment.sehri),
    iftar: adjustTime(day.iftar, hanafiTimeAdjustment.iftar),
  }));

  function adjustTime(timeStr, adjustment) {
    let [hours, minutes] = timeStr.split(" ")[0].split(":").map(Number);
    const ampm = timeStr.split(" ")[1];

    minutes += adjustment;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    } else if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }

    if (hours === 12 || hours === 0) {
      hours = 12;
    } else {
      hours %= 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={5}>
        <Heading as="h1" size="xl" color="green.600">
          Ramadan 2024 Calendar - Srinagar (Hanafi)
        </Heading>
        <Image src="https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyYW1hZGFuJTIwY2FsZW5kYXIlMjBkZXNpZ258ZW58MHx8fHwxNzEwMjAzNzA5fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Ramadan Calendar Design Reference" />
        <Box w="full" bg="white" p={4} borderRadius="md" boxShadow="md">
          <Table variant="simple" colorScheme="green">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th isNumeric>
                  <FaMoon /> Sehri
                </Th>
                <Th isNumeric>
                  <FaSun /> Iftar
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {adjustedTimes.map((day, index) => (
                <Tr key={index}>
                  <Td>{day.date}</Td>
                  <Td isNumeric>{day.sehri}</Td>
                  <Td isNumeric>{day.iftar}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Text color="gray.600">Times are adjusted according to Hanafi orientation.</Text>
      </VStack>
    </Container>
  );
};

export default Index;
