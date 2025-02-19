<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
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


    public function index(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
        ]);

        $messages = Messenger::where(function ($query) use ($request) {
            $query->where('sender_id', Auth::id())
                  ->where('receiver_id', $request->receiver_id);
        })->orWhere(function ($query) use ($request) {
            $query->where('sender_id', $request->receiver_id)
                  ->where('receiver_id', Auth::id());
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
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
}
