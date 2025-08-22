<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TanyaiAiController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'pertanyaan' => 'required|string|max:500',
        ]);

        try {
            $response = Http::withToken(env('HUGGINGFACE_API_KEY'))
                ->timeout(60)
                ->post("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", [
                    "inputs" => "Kamu adalah asisten ahli zakat. "
                        . "Jawablah dengan bahasa sederhana.\n\nPertanyaan: "
                        . $request->pertanyaan,
                ]);

            if ($response->failed()) {
                return response()->json([
                    'jawaban' => "Terjadi kesalahan saat menghubungi AI (status {$response->status()}).",
                ], 500);
            }

            $result = $response->json();

            // Struktur response Hugging Face biasanya array dengan "generated_text"
            $jawaban = $result[0]['generated_text'] ?? "Maaf, AI tidak memberi jawaban.";

            return response()->json([
                'jawaban' => $jawaban,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'jawaban' => "Terjadi kesalahan saat menghubungi AI. " . $e->getMessage(),
            ], 500);
        }
    }
}
