<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Messenger;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $time = Carbon::now()->toDateTimeString(); // Get current time using Carbon
        $user = Auth::user();
        $sender_id = Auth::id();
        $reciever_id = $request->input('id');

        // Fire the event, passing message, time, and user
        broadcast(new MessageSent($message, $time, $user, $sender_id, $reciever_id))->toOthers();

        return response()->json([
            'message' => 'Message sent!',
            'payload' => [
                'message' => $message,
                'time' => $time,
                'user' => $user,
                'sender_id' => $sender_id,
                'reciever_id' => $reciever_id
            ]
        ]);
    }


    // public function index($id)
    // {c
    //     $userId = auth()->id();
    
    //     // Validate if the user exists (Optional)
    //     if (!User::find($id)) {
    //         return response()->json(['error' => 'User not found'], 404);
    //     }
    
    //     $messages = Messenger::where(function ($query) use ($userId, $id) {
    //             $query->where('sender_id', $userId)
    //                   ->where('receiver_id', $id);
    //         })
    //         ->orWhere(function ($query) use ($userId, $id) {
    //             $query->where('sender_id', $id)
    //                   ->where('receiver_id', $userId);
    //         })
    //         ->orderBy('created_at', 'asc')
    //         ->paginate(20); // Add pagination
    
    //     return response()->json($messages);
    // }
    public function index($id)
{
    $userId = auth()->id();

    // Validate if the user exists (Optional)
    if (!User::find($id)) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $messages = Messenger::where(function ($query) use ($userId, $id) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $id);
        })
        ->orWhere(function ($query) use ($userId, $id) {
            $query->where('sender_id', $id)
                  ->where('receiver_id', $userId);
        })
        ->orderBy('created_at', 'desc')
        ->paginate(100);

    // Bilang ng mga hindi pa nababasang mensahe
    $unreadCount = Messenger::where('sender_id', $id)
        ->where('receiver_id', $userId)
        ->where('is_read', 0)
        ->count();

    return response()->json([
        'messages' => $messages,
        'unread_count' => $unreadCount
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:500',
        ]);

        $message = Messenger::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }



    public function notificationCount()
    {
        $userId = Auth::id();
    
        // Kunin lahat ng unread messages ng current user
        $unreadMessages = Messenger::where('receiver_id', $userId)
            ->where('is_read', false)
            ->with('sender:id,name') // Kunin ang sender info
            ->get();
    
        // Group messages by sender at bilangin
        $senders = $unreadMessages->groupBy('sender_id')->map(function ($messages) {
            return [
                'sender_id' => $messages->first()->sender_id,
                'sender_name' => $messages->first()->sender->name,
                'unread_count' => $messages->count(),
            ];
        })->values();
    
        return response()->json([
            'total_unread' => $unreadMessages->count(), // Kabuuang bilang ng unread messages
            'senders' => $senders // Listahan ng senders na may unread messages
        ]);
    }
    
}
