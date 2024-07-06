"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

import GetNotificationOptions from "@/apis/notification/getNotifications";
import { IAlarmMessage } from "@/types/alarm";
import deleteNotifications from "@/apis/notification/deleteNotifications";

interface AlarmContextType {
  alarmMessages: IAlarmMessage[];
  getAlarmMessages: () => void;
  removeAlarmMessage: (id: number) => void;
  removeAllMessages: () => void;
  count: number;
  hasMore: boolean;
}

const AlarmContext = createContext<AlarmContextType>({
  alarmMessages: [],
  getAlarmMessages: () => {},
  removeAlarmMessage: () => {},
  removeAllMessages: () => {},
  count: 0,
  hasMore: true,
});

function AlarmProvider({ children }: { children: ReactNode }) {
  const [alarmMessages, setAlarmMessages] = useState<IAlarmMessage[]>([]);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getAlarmMessages = async () => {
    const { totalCount, list } = await GetNotificationOptions({ page, pageSize: 10 });
    console.log(totalCount);
    console.log(list);
    if (list?.length === 0) {
      setHasMore(false);
    } else if (list) {
      setAlarmMessages(prev => [...prev, ...list]);
      setPage(prev => prev + 1);
    }

    if (totalCount) setCount(() => totalCount);
  };

  const removeAlarmMessage = async (id: number) => {
    await deleteNotifications(id);
    setAlarmMessages(alarmMessages.filter(m => m.id !== id));
  };

  const removeAllMessages = () => {
    alarmMessages.forEach(async m => {
      await deleteNotifications(m.id);
    });
    setAlarmMessages(alarmMessages.filter(v => v.id === 0));
  };

  const values = useMemo(
    () => ({ alarmMessages, getAlarmMessages, removeAlarmMessage, removeAllMessages, count, hasMore }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [alarmMessages],
  );

  return <AlarmContext.Provider value={values}>{children}</AlarmContext.Provider>;
}

function useAlarm() {
  const context = useContext(AlarmContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 쓰세요");
  }
  return context;
}

export { AlarmProvider, useAlarm };
