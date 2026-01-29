import api from "../api/api";
import { CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react";

export default function TaskList({ tasks, refresh }) {
  const completeTask = async (id) => {
    await api.patch(`/tasks/${id}/complete`);
    refresh();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "IN_PROGRESS":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "PENDING":
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <ChevronRight className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center space-x-4">
            {getStatusIcon(task.status)}
            <div>
              <h4 className="font-semibold text-gray-900">{task.title}</h4>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status.replace("_", " ")}
                </span>
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {task.status !== "COMPLETED" && (
            <button
              onClick={() => completeTask(task.id)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Mark Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}