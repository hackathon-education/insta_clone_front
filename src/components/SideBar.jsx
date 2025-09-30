import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Flex,
  Button,
  Link,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai"
import { BiLogOut } from 'react-icons/bi'
import { CreatePostLogo, InstagramLogo, NotificationsLogo, SearchLogo } from '../assests/logos'

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 라우트 변경 감지
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasToken, setHasToken] = useState(false);

  // 라우트가 바뀔 때마다 토큰 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <SearchLogo />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo />,
      text: 'Notifications',
    },
    {
      icon: <CreatePostLogo />,
      text: 'Create',
    },
    {
      icon: <Avatar size={'sm'} name='Aditya' src='/profilepic.png' />,
      text: "Profile",
      link: "/Aditya",
    },
  ];

  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      top={0}
      left={0}
      px={4}
      position={'sticky'}
    >
      <Flex direction={'column'} gap={10} w='full' height={'full'}>
        <Link to={'/'} as={RouterLink} display={'block'} cursor={'pointer'}>
          <InstagramLogo />
        </Link>

        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          {sidebarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement='right'
              ml={1}
              openDelay={500}
              display={{ md: "none" }}
            >
              <Link
                display={"flex"}
                to={item.link || null}
                as={RouterLink}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={'full'}
              >
                {item.icon}
                <Box display={{ base: 'none', md: "block" }}>
                  {item.text}
                </Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>

        {/* 로그인/로그아웃 버튼 */}
        <Tooltip
          hasArrow
          label={hasToken ? 'Log Out' : 'Log In'}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ md: "none" }}
        >
          <Flex
            alignItems={'center'}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={'full'}
            mt={'auto'}
            cursor={'pointer'}
            onClick={hasToken ? handleLogout : handleLogin}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: 'none', md: "block" }}
              variant={'ghost'}
              _hover={{ bg: "transparent" }}
            >
              {hasToken ? "Log Out" : "Log In"}
            </Button>
          </Flex>
        </Tooltip>
      </Flex>

      {/* 로그아웃 모달 */}
      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그아웃</ModalHeader>
          <ModalBody>로그아웃 되었습니다.</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default SideBar;
