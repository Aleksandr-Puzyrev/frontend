"use client";

import useAiAssistantMutation from "@/api/hooks/ai/useAiAssistantMutation";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

interface AIAssistantProps {
  lessonId: string;
}

export const AIAssistant = ({ lessonId }: AIAssistantProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      text: string;
      isUser: boolean;
    }>
  >([{ text: "Привет! Я ваш ИИ-помощник. Задавайте вопросы по уроку.", isUser: false }]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useAiAssistantMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    sendMessage(
      { message: input, lessonId },
      {
        onSuccess: (response) => {
          setMessages((prev) => [
            ...prev,
            {
              text: response.message,
              isUser: false,
            },
          ]);
        },
      }
    );

    setInput("");
  };

  return (
    <Stack spacing={2} alignItems="start" position="fixed" bottom={24} right={24} zIndex={1000}
    >
      {open && (
        <Paper
          elevation={3}
          sx={{
            width: 350,
            height: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Icon icon="mdi:chat-question" />
            <Typography variant="h6">ИИ-ассистент урока</Typography>
          </Box>
          <Stack
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.isUser ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  bgcolor: message.isUser ? "primary.light" : "background.default",
                  color: message.isUser ? "primary.contrastText" : "text.primary",
                  p: 1.5,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Box>
            ))}
            {isPending && (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  maxWidth: "80%",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2">ИИ-ассистент думает...</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Stack>
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Задайте вопрос..."
              disabled={isPending}
            />
            <IconButton type="submit" color="primary" disabled={isPending || !input.trim()}>
              <Icon icon="mdi:send" />
            </IconButton>
          </Box>
        </Paper>
      )}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          bgcolor: "primary.dark",
          color: "white",
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
      >
        <Icon icon="mdi:chat-question" />
      </IconButton>
    </Stack>
  );
};
