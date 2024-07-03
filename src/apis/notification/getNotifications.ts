import { RequestNotifications } from "@/types/alarm";
import fetchInstance from "@/utils/fetchInstance";

const GetNotificationOptions = async (options: { page?: number; pageSize?: number }) => {
  try {
    const data = await fetchInstance<RequestNotifications>(`notifications`, {
      method: "GET",
      params: options,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Notifications list failed");
    } else {
      throw new Error("Notifications list failed");
    }
  }
};

export default GetNotificationOptions;
